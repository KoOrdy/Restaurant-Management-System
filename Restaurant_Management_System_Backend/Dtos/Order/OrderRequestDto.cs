using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Order
{
    public class OrderRequestDto
    {
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
