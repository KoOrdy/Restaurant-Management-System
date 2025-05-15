using resturantApi.Models; 
using resturantApi.Dtos.Order;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace resturantApi.Interfaces
{
    public interface IOrdersRepository
    {
        Task<(bool, string? ErrorMessage)> MakeOrderAsync(OrderRequestDto orderRequestDto, int customerId, int restaurantId, int reservationId);
        Task<bool> CancelOrderAsync(int OrderId);
        Task<List<OrderDto>> GetOrdersByRestaurantIdAsync(int restaurantId);
        Task<bool> UpdateOrderStatusAsync(int orderId, string newStatus);
    }
}