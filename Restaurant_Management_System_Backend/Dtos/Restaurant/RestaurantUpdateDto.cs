using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantUpdateDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? ImageUrl { get; set; }

    }
}