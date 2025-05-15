using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantRequestDto
    {
        [Required]
        public string Name { get; set; }
        
        public string? Description { get; set; }
        public string? Location { get; set; }
        
        public int? ManagerId { get; set; }
        
        [Required]
        public string ManagerName { get; set; }
        
        [Required]
        [RegularExpression(@"^.*@.*$", ErrorMessage = "Email must contain @")]
        public string ManagerEmail { get; set; }
        public string? ImageUrl { get; set; }
    }
}