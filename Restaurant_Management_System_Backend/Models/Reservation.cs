using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        public int? CustomerId { get; set; }

        public int? RestaurantId { get; set; }

        public int? TableId { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }
        
        [Required]
        public TimeSpan EndTime { get; set; }
        
        public void SetReservationTime(TimeSpan startTime)
        {
            StartTime = startTime;
            EndTime = startTime.Add(TimeSpan.FromHours(1));
        }

        [Required]
        public int NumberOfGuests { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } = "Pending";

        [ForeignKey("CustomerId")]
        public User? Customer { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }

        [ForeignKey("TableId")]
        public Table? Table { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}