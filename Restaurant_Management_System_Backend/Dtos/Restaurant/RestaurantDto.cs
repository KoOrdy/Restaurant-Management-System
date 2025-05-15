using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;
namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string ManagerName { get; set; }
        public string ManagerEmail { get; set; }
        public string? ImageUrl { get; set; } // New property
    }
}