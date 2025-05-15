using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantCreateDto
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

        [Required]
        [StringLength(100,MinimumLength =6,ErrorMessage ="Password at least 6 characters")]
        public string Password {get;set;}=string.Empty;
        public string? ImageUrl { get; set; }
    }
}