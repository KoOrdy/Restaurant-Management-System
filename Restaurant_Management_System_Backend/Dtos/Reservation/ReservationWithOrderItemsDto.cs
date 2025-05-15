using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;
using resturantApi.Dtos.Order;

namespace resturantApi.Dtos.Reservation
{
    public class ReservationWithOrderItemsDto
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string? RestaurantName { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan? EndTime { get; set; } // optional
        public int NumberOfGuests { get; set; }
        public string Status { get; set; }
        public OrderDto OrderDto { get; set; }
    }
}