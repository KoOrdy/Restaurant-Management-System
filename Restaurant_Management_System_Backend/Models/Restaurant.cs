using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } = "Pending";

        public int? ManagerId { get; set; }

        [Required, MaxLength(100)]
        public string ManagerName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string ManagerEmail { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ImageUrl { get; set; } // New property for image URL
        
        [ForeignKey("ManagerId")]
        public User? Manager { get; set; }

        public ICollection<MenuItem>? MenuItems { get; set; }
        public ICollection<Table>? Tables { get; set; }
        public ICollection<Reservation>? Reservations { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Review>? Reviews { get; set; }
    }
}