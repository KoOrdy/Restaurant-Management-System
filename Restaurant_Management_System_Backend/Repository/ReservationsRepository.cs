using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Mappers;
using resturantApi.Dtos.Reservation;
using resturantApi.Dtos.Order;
using resturantApi.Interfaces;
using resturantApi.Data;
using resturantApi.SMTP;

namespace resturantApi.Repository
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly ApplicationDBContext _context;

        public ReservationsRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        private async Task<bool> IsTableAvailableAsync(int tableId, DateTime reservationDate, TimeSpan startTime, TimeSpan endTime, int? excludeReservationId = null)
        {
            return !await _context.Reservations.AnyAsync(r =>
                r.TableId == tableId &&
                r.ReservationDate == reservationDate &&
                r.Status == "Accepted" && 
                (excludeReservationId == null || r.Id != excludeReservationId) && 
                ((r.StartTime < endTime && r.EndTime > startTime) || (r.StartTime == startTime && r.EndTime == endTime))
            );
        }

        public async Task<(ReservationDto? Reservation, string? ErrorMessage)> MakeReservationAsync(ReservationRequestDto reservationRequestDto, int customerId, int restaurantId)
        {
            if (reservationRequestDto.ReservationDate.Date < DateTime.UtcNow.Date)
            {
                return (null, "Reservation date cannot be in the past.");
            }

            var calculatedEndTime = reservationRequestDto.StartTime.Add(TimeSpan.FromHours(1));

            var hasExistingReservation = await _context.Reservations.AnyAsync(r =>
                r.CustomerId == customerId &&
                r.ReservationDate.Date == reservationRequestDto.ReservationDate.Date &&
                (
                    (r.StartTime < calculatedEndTime && r.EndTime > reservationRequestDto.StartTime)
                ));

            if (hasExistingReservation)
            {
                return (null, "You already have a reservation during this time.");
            }

            var isTableAvailable = await IsTableAvailableAsync(
                reservationRequestDto.TableId,
                reservationRequestDto.ReservationDate,
                reservationRequestDto.StartTime,
                calculatedEndTime
            );

            if (!isTableAvailable)
            {
                return (null, "Selected time slot is not available for this table.");
            }

            var reservation = reservationRequestDto.ToReservationFromDto(customerId, restaurantId);
            reservation.SetReservationTime(reservationRequestDto.StartTime);

            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();

            return (reservation.ToDtoFromReservation(), null);
        }

        public async Task<(ReservationDto? Reservation, string? ErrorMessage)> RescheduleReservationAsync(int reservationId, RescheduleReservationDto rescheduleReservationDto)
        {
            if (rescheduleReservationDto.NewReservationDate.Date < DateTime.UtcNow.Date)
            {
                return (null, "New reservation date cannot be in the past.");
            }
            var reservation = await _context.Reservations
                .Where(r => r.Status == "Pending" && r.Id == reservationId)
                .FirstOrDefaultAsync();

            if (reservation == null) return (null, "Reservation not found or not in pending status.");

            var calculatedEndTime = rescheduleReservationDto.NewStartTime.Add(TimeSpan.FromHours(1));
            var IsTableAvailable = await IsTableAvailableAsync(
                reservation.TableId!.Value,
                rescheduleReservationDto.NewReservationDate,
                rescheduleReservationDto.NewStartTime,
                calculatedEndTime,
                reservation.Id 
            );            
            if (!IsTableAvailable) return (null, "Selected time slot is not available for this table.");

            reservation.ReservationDate = rescheduleReservationDto.NewReservationDate;
            reservation.StartTime = rescheduleReservationDto.NewStartTime;
            reservation.SetReservationTime(reservation.StartTime);

            await _context.SaveChangesAsync();

            return (reservation.ToDtoFromReservation(), null);

        }

        public async Task<bool> DeleteReservationAsync(int reservationId)
        {
            var reservation = await _context.Reservations.FindAsync(reservationId);
            if (reservation == null) return false;

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ReservationWithOrderItemsDto>> GetAllReservationsAsync(int customerId)
        {
            var reservations = await _context.Reservations
                .Include(r => r.Restaurant)
                .Where(r => r.CustomerId == customerId)
                .ToListAsync();

            if (reservations == null || reservations.Count == 0) return null;

            var reservationsDto = new List<ReservationWithOrderItemsDto>();

            foreach (var reservation in reservations)
            {
                var reservationDto = new ReservationWithOrderItemsDto
                {
                    Id = reservation.Id,
                    RestaurantId = reservation.RestaurantId ?? 0,
                    RestaurantName = reservation.Restaurant?.Name,
                    ReservationDate = reservation.ReservationDate,
                    StartTime = reservation.StartTime,
                    EndTime = reservation.EndTime,
                    NumberOfGuests = reservation.NumberOfGuests,
                    Status = reservation.Status
                };

                var order = await _context.Orders
                    .Where(o => o.ReservationId == reservation.Id)
                    .FirstOrDefaultAsync();

                if (order != null)
                {
                    var orderItems = await _context.OrderItems
                        .Where(oi => oi.OrderId == order.Id)
                        .Include(oi => oi.MenuItem)
                        .ToListAsync();

                    reservationDto.OrderDto = new OrderDto
                    {
                        Id = order.Id,
                        Status = order.Status,
                        TotalAmount = order.TotalAmount,
                        OrderItems = orderItems.Select(oi => new OrderItemDto
                        {
                            MenuItemId = oi.MenuItemId ?? 0,
                            MenuItemName = oi.MenuItem?.Name,
                            Quantity = oi.Quantity,
                            UnitPrice = oi.UnitPrice
                        }).ToList()
                    };
                }

                reservationsDto.Add(reservationDto);
            }

            return reservationsDto;
        }

        public async Task<List<ReservationManagerDto>> GetRestaurantReservationsAsync(int restaurantId)
        {
            return await _context.Reservations
                .Include(r => r.Customer)
                .Include(r => r.Table)
                .Include(r => r.Orders) 
                    .ThenInclude(o => o.OrderItems)
                        .ThenInclude(oi => oi.MenuItem)
                .Where(r => r.RestaurantId == restaurantId)
                .Select(r => new ReservationManagerDto
                {
                    Id = r.Id,
                    CustomerName = r.Customer.Name,
                    ReservationDate = r.ReservationDate,
                    StartTime = r.StartTime,
                    EndTime = r.EndTime,
                    NumberOfGuests = r.NumberOfGuests,
                    Status = r.Status,
                    TableId = r.TableId,
                    TableName = r.Table.TableName,

                    Order = r.Status == "Accepted" && r.Orders.Any()
                        ? new OrderDto
                        {
                            Id = r.Orders.First().Id,
                            Status = r.Orders.First().Status,
                            TotalAmount = r.Orders.First().TotalAmount,
                            OrderItems = r.Orders.First().OrderItems.Select(oi => new OrderItemDto
                            {
                                MenuItemId=oi.Id,
                                MenuItemName = oi.MenuItem.Name,
                                Quantity = oi.Quantity,
                                UnitPrice = oi.UnitPrice
                            }).ToList()
                        }
                        : null
                })
                .ToListAsync();
        }

        public async Task<List<ReservationManagerDto>> GetReservationsForManagerAsync(int managerId)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.ManagerId == managerId);
            if (restaurant == null) return null;

            var reservations = await GetRestaurantReservationsAsync(restaurant.Id);
            return reservations;
        }

        public async Task<Reservation> GetReservationByIdAsync(int reservationId)
        {
            return await _context.Reservations
                .Include(r => r.Customer)
                .FirstOrDefaultAsync(r => r.Id == reservationId);
        }
        public async Task<(bool Success, string? ErrorMessage)> AcceptReservationAsync(int reservationId)
        {
            var reservation = await GetReservationByIdAsync(reservationId);

            if (reservation == null)
                return (false, "Reservation not found.");

            if (reservation.Status != "Pending")
                return (false, "Reservation is not in pending status.");

            var start = reservation.StartTime;
            var end = reservation.EndTime;
            var date = reservation.ReservationDate.Date;
            var tableId = reservation.TableId;

            var hasConflict = await _context.Reservations.AnyAsync(r =>
                r.Id != reservation.Id &&
                r.TableId == tableId &&
                r.ReservationDate.Date == date &&
                r.Status == "Accepted" &&
                r.StartTime < end && r.EndTime > start
            );

            if (hasConflict)
                return (false, "Another reservation is already accepted during this time for the same table.");

            reservation.Status = "Accepted";
            await _context.SaveChangesAsync();

            return (true, null);
        }

        public async Task<bool> RejectReservationAsync(int reservationId)
        {
            var reservation = await GetReservationByIdAsync(reservationId);
            if (reservation.Status != "Pending")
                return false;

            reservation.Status = "Rejected";
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> MarkPastReservationsAsFinishedAsync()
        {
            var today = DateTime.Today;

            var pastReservations = await _context.Reservations
                .Where(r => r.Status == "Accepted" && r.ReservationDate.Date < today)
                .ToListAsync();

            foreach (var reservation in pastReservations)
            {
                reservation.Status = "Finished";
            }

            await _context.SaveChangesAsync();
            return pastReservations.Count;
        }

    }
}
