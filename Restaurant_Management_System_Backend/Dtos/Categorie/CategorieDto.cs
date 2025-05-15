using System.ComponentModel.DataAnnotations;

namespace resturantApi.Dtos.Categorie
{
    public class CategorieDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}