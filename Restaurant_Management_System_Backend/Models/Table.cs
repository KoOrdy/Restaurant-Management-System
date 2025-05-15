using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Table
    {
        public int Id { get; set; }

        public int? RestaurantId { get; set; }

        [Required]
        public int Capacity { get; set; }

        [Required, MaxLength(50)]
        public string TableName { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }

        public ICollection<Reservation>? Reservations { get; set; }
    }
}