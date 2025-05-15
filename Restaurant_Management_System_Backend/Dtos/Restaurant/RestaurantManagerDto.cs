using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using resturantApi.Models;

namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantManagerDto
    {
        public string RestaurantName { get; set; }
        public int ManagerId { get; set; }
        public string ManagerName { get; set; }
        
        [JsonPropertyName("imageUrl")]
        public string? ImageUrl { get; set; }
    }
}