using resturantApi.Models;
using resturantApi.Dtos.Categorie;

namespace resturantApi.Interfaces
{
    public interface ICategorieRepository
    {
        Task<List<CategorieDto>> GetAllCategoriesAsync();
        Task<CategorieDto?> GetCategorieByIdAsync(int id);
        Task<CategorieDto?> CreateCategorieAsync(RequestCategorieDto dto);
        Task<bool> DeleteCategorieAsync(int id);
        Task<CategorieDto?> UpdateCategorieAsync(int id, RequestCategorieDto dto);
    }
}