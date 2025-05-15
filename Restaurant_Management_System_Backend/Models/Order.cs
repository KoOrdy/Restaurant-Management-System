using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int? CustomerId { get; set; }

        public int? RestaurantId { get; set; }

        [Required]
        public int ReservationId { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } = "Pending";

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [ForeignKey("CustomerId")]
        public User? Customer { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }

        [ForeignKey("ReservationId")]
        public Reservation? Reservation { get; set; } // New navigation property

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}