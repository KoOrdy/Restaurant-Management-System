using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Restaurant
{
    public class MenuItemCreateUpdateDto
    {
        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        public bool Availability { get; set; } = true;

        public string? ImageUrl { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}