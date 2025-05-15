using Microsoft.EntityFrameworkCore;
using resturantApi.Data;
using resturantApi.Interfaces;
using resturantApi.Models;
using resturantApi.Dtos.Categorie;
using resturantApi.Mappers;

namespace resturantApi.Repository
{
    public class CategorieRepository : ICategorieRepository
    {
        private readonly ApplicationDBContext _context;

        public CategorieRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategorieDto>> GetAllCategoriesAsync()
        {
            var categories = await _context.FoodCategories.ToListAsync();
            return categories.Select(c => c.ToCategorieDto()).ToList();
        }

        public async Task<CategorieDto?> GetCategorieByIdAsync(int id)
        {
            var category = await _context.FoodCategories.FindAsync(id);
            return category?.ToCategorieDto();
        }

        public async Task<CategorieDto?> CreateCategorieAsync(RequestCategorieDto dto)
        {
            dto.Name = char.ToUpper(dto.Name[0]) + dto.Name.Substring(1).ToLower();

            var exists = await _context.FoodCategories.AnyAsync(c => c.Name == dto.Name);
            if (exists) return null;

            var category = dto.ToFoodfromCategorieDto();
            _context.FoodCategories.Add(category);
            await _context.SaveChangesAsync();

            return category.ToCategorieDto();
        }

        public async Task<bool> DeleteCategorieAsync(int id)
        {
            var category = await _context.FoodCategories.FindAsync(id);
            if (category == null) return false;

            _context.FoodCategories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<CategorieDto?> UpdateCategorieAsync(int id, RequestCategorieDto dto)
        {
            var category = await _context.FoodCategories.FindAsync(id);
            if (category == null) return null;

            var exists = await _context.FoodCategories
                .AnyAsync(c => c.Name.ToLower() == dto.Name.ToLower() && c.Id != id);
            if (exists) return null;

            category.Name = char.ToUpper(dto.Name[0]) + dto.Name.Substring(1).ToLower();
            await _context.SaveChangesAsync();

            return category.ToCategorieDto();
        }
    }
}