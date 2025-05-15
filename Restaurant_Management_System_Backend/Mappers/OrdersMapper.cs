using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Order;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class OrdersMapper
    {
        public static Order FromDtoToOrder(this OrderRequestDto dto, int customerId, int restaurantId, int reservationId, decimal totalAmount)
        {
            return new Order
            {
                CustomerId = customerId,
                RestaurantId = restaurantId,
                ReservationId = reservationId,
                TotalAmount = totalAmount
            };
        }

        public static OrderItem FromDtoToOrderItem(this OrderItemDto dto, int orderId, decimal unitPrice)
        {
            return new OrderItem
            {
                OrderId = orderId,
                MenuItemId = dto.MenuItemId,
                Quantity = dto.Quantity,
                UnitPrice = unitPrice
            };
        }


    }
}