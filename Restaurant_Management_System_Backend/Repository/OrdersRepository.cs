using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Dtos.Order;
using resturantApi.Mappers;
using resturantApi.Interfaces;
using resturantApi.Data;
using resturantApi.SMTP;

namespace resturantApi.Repository
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly ApplicationDBContext _context;

        public OrdersRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        private async Task<List<OrderItemDto>> GetItemsUnitPricesAsync(List<OrderItemDto> oderItemDto)
        {
            var menuItems = await _context.MenuItems
                .Where(m => oderItemDto.Select(i => i.MenuItemId).Contains(m.Id))
                .ToListAsync();

            var orderItems = new List<OrderItemDto>();
            foreach (var item in oderItemDto)
            {
                var menuItem = menuItems.FirstOrDefault(m => m.Id == item.MenuItemId);
                if (menuItem != null)
                {
                    orderItems.Add(new OrderItemDto
                    {
                        MenuItemId = item.MenuItemId,
                        MenuItemName = menuItem.Name,
                        Quantity = item.Quantity,
                        UnitPrice = menuItem.Price
                    });
                }
            }
            return orderItems;
        }

        private async Task<decimal> CalculatedTotalAmountAsync(List<OrderItemDto> orderItems)
        {
            decimal totalAmount = 0;
            foreach (var item in orderItems)
            {
                var menuItem = await _context.MenuItems.FindAsync(item.MenuItemId);
                if (menuItem != null)
                {
                    totalAmount += item.Quantity * menuItem.Price;
                }
            }
            return totalAmount;
        }

        public async Task<(bool, string? ErrorMessage)> MakeOrderAsync(OrderRequestDto orderRequestDto, int customerId, int restaurantId, int reservationId)
        {
            if (orderRequestDto == null || orderRequestDto.OrderItems == null || !orderRequestDto.OrderItems.Any())
                return (false, "Invalid order data.");

            var reservation = await _context.Reservations
                .Include(r => r.Customer)
                .Include(r => r.Restaurant)
                .Include(r => r.Table)
                .FirstOrDefaultAsync(r => r.Id == reservationId && r.Status == "Accepted");

            if (reservation == null)
                return (false, "Reservation not found or not accepted.");

            var orderItemsWithPrices = await GetItemsUnitPricesAsync(orderRequestDto.OrderItems);
            var totalAmount = await CalculatedTotalAmountAsync(orderItemsWithPrices);
            if (totalAmount <= 0)
                return (false, "Total amount cannot be zero or negative.");
            
            var newOrder = new Order
            {
                CustomerId = customerId,
                RestaurantId = restaurantId,
                ReservationId = reservationId,
                TotalAmount = totalAmount,
                Status = "Pending"
            };

            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            var orderItems = orderRequestDto.OrderItems
                .Select(item =>
                {
                    var unitPrice = orderItemsWithPrices.FirstOrDefault(i => i.MenuItemId == item.MenuItemId)?.UnitPrice ?? 0;
                    return item.FromDtoToOrderItem(newOrder.Id, unitPrice);
                })
                .ToList();


            await _context.OrderItems.AddRangeAsync(orderItems);
            await _context.SaveChangesAsync();

            var emailBody = $"""
            Hello {reservation.Customer.Name},

            Thank you for placing your order with {reservation.Restaurant.Name}!

            Here are your reservation and order details:

            Reservation ID: {reservation.Id}
            Order ID: {newOrder.Id}
            Restaurant Name: {reservation.Restaurant.Name}
            Table Name: {reservation.Table.TableName}
            Date: {reservation.ReservationDate:yyyy-MM-dd}
            Start Time: {reservation.StartTime.ToString(@"hh\:mm")}
            End Time: {reservation.EndTime.ToString(@"hh\:mm")}
            Total Price: {newOrder.TotalAmount:C}

            We look forward to serving you.
            If you have any questions, feel free to contact us.

            Best regards,
            Restaurant Management System Team
            """;


            Mailer.SendEmail(reservation.Customer.Email, "Order Confirmation", emailBody);

            return (true, null);
        }

        public async Task<bool> CancelOrderAsync(int OrderId)
        {
            var order = await _context.Orders
                .Where(o => o.Status == "Pending")
                .FirstOrDefaultAsync(o => o.Id == OrderId);
            
            if (order == null)
                return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<OrderDto>> GetOrdersByRestaurantIdAsync(int restaurantId)
        {
            return await _context.Orders
                .Where(o => o.RestaurantId == restaurantId)
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    CustomerName = o.Customer.Name,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                    {
                        MenuItemId=oi.MenuItem.Id,
                        MenuItemName = oi.MenuItem.Name,
                        Quantity = oi.Quantity
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, string newStatus)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Restaurant)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
                return false;

            if (!IsValidStatus(newStatus))
                return false;

            if (order.Status == "Delivered")
                return false;

            order.Status = newStatus;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            if (newStatus == "Ready" && order.Customer != null && order.Restaurant != null)
            {
                var emailBody = $"""
                Hello {order.Customer.Name},

                Your order (ID: {order.Id}) at {order.Restaurant.Name} is now READY!

                Please be prepared to receive it or pick it up as scheduled.

                Thank you for choosing us.

                Best regards,
                Restaurant Management System Team
                """;

                Mailer.SendEmail(order.Customer.Email, "Order Ready Notification", emailBody);
            }

            return true;
        }


        private static bool IsValidStatus(string status)
        {
            return status == "Pending" || 
                   status == "Preparing" || 
                   status == "Ready" || 
                   status == "Delivered";
        }
    }
}