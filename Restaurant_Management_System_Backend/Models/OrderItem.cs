using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resturantApi.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int? OrderId { get; set; }

        public int? MenuItemId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }


        [ForeignKey("OrderId")]
        public Order? Order { get; set; }

        [ForeignKey("MenuItemId")]
        public MenuItem? MenuItem { get; set; }
    }
}