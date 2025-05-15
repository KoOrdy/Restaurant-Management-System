using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Review
    {
        public int Id { get; set; }

        public int? CustomerId { get; set; }

        public int? RestaurantId { get; set; }

        [Required, Range(1, 5)]
        public int Rating { get; set; }

        [Required, MaxLength(1000)]
        public string Comment { get; set; } = string.Empty;

        [Required]
        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;

        [ForeignKey("CustomerId")]
        public User? Customer { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }
    }
}