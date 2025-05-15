using resturantApi.Models; 
using resturantApi.Dtos.Reservation;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace resturantApi.Interfaces
{
    public interface IReservationsRepository
    {
        Task<(ReservationDto? Reservation, string? ErrorMessage)> MakeReservationAsync(ReservationRequestDto reservationRequestDto, int customerId, int restaurantId);
        Task<(ReservationDto? Reservation, string? ErrorMessage)> RescheduleReservationAsync(int reservationId, RescheduleReservationDto rescheduleReservationDto);
        Task<bool> DeleteReservationAsync(int reservationId);
        Task<List<ReservationWithOrderItemsDto>> GetAllReservationsAsync(int customerId);
        Task<List<ReservationManagerDto>> GetRestaurantReservationsAsync(int restaurantId);
        Task<List<ReservationManagerDto>> GetReservationsForManagerAsync(int managerId);
        Task<Reservation> GetReservationByIdAsync(int reservationId);
        Task<(bool Success, string? ErrorMessage)> AcceptReservationAsync(int reservationId);
        Task<bool> RejectReservationAsync(int reservationId);
        Task<int> MarkPastReservationsAsFinishedAsync();
    }
}






