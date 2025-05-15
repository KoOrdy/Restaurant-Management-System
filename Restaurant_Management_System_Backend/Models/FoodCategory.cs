using System.ComponentModel.DataAnnotations;

namespace resturantApi.Models
{
    public class FoodCategory
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public ICollection<MenuItem>? MenuItems { get; set; }
    }
}