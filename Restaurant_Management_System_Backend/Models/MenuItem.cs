using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class MenuItem
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public bool Availability { get; set; } = true;

        public int? RestaurantId { get; set; }

        public int? CategoryId { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; } // New property for image URL

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }

        [ForeignKey("CategoryId")]
        public FoodCategory? Category { get; set; }

        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}