using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using resturantApi.Models;

namespace resturantApi.Dtos.Restaurant
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Availability { get; set; }
        
        [JsonPropertyName("imageUrl")]
        public string? ImageUrl { get; set; }
    }
}