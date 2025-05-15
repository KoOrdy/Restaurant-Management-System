using resturantApi.Models;
using resturantApi.Dtos.Categorie;
namespace resturantApi.Mappers
{
    public static class CategorieMapper
    {
        public static CategorieDto ToCategorieDto(this FoodCategory foodCategory)
        {
            return new CategorieDto
            {
                Id=foodCategory.Id,
                Name=foodCategory.Name
            };
        }
        public static FoodCategory ToFoodfromCategorieDto(this RequestCategorieDto categorieDto)
        {
            return new FoodCategory
            {
                Name=categorieDto.Name
            };
        }
    }
}