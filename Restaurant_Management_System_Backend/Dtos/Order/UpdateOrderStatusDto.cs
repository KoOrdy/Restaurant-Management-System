using System.ComponentModel.DataAnnotations;

namespace resturantApi.Dtos.Order
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public string NewStatus { get; set; }
    }
}