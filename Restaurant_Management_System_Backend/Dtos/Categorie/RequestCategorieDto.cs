using System.ComponentModel.DataAnnotations;

namespace resturantApi.Dtos.Categorie
{
    public class RequestCategorieDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}