using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Order
{
    public class OrderItemDto
    {
        public int MenuItemId { get; set; }

        public string? MenuItemName { get; set; }
        public int Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
    }
}