using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class Messages
    {
        public int Id { get; set; }

        public int? SenderId { get; set; }

        public int? ReceiverId { get; set; }

        [Required, MaxLength(2000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [Required]
        //ww
        public bool IsRead { get; set; } = false;

        [ForeignKey("SenderId")]
        public User? Sender { get; set; }

        [ForeignKey("ReceiverId")]
        public User? Receiver { get; set; }
    }
}