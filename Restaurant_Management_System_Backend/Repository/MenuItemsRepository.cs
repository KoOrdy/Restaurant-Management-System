using Microsoft.EntityFrameworkCore;
using resturantApi.Data;
using resturantApi.Interfaces;
using resturantApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resturantApi.Repository
{
    public class MenuItemsRepository : IMenuItemsRepository
    {
        private readonly ApplicationDBContext _context;

        public MenuItemsRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Restaurant?> GetRestaurantByManagerIdAsync(int managerId)
        {
            return await _context.Restaurants.FirstOrDefaultAsync(r => r.ManagerId == managerId);
        }

        public async Task<List<MenuItem>> GetMenuItemsByRestaurantIdAsync(int restaurantId)
        {
            return await _context.MenuItems
                .Where(m => m.RestaurantId == restaurantId)
                .Include(m => m.Category)
                .ToListAsync();
        }

        public async Task<MenuItem?> GetMenuItemByIdAsync(int id, int restaurantId)
        {
            return await _context.MenuItems
                .Include(m => m.Category)
                .FirstOrDefaultAsync(m => m.Id == id && m.RestaurantId == restaurantId);
        }

        public async Task AddMenuItemAsync(MenuItem menuItem)
        {
            await _context.MenuItems.AddAsync(menuItem);
        }

        public async Task UpdateMenuItemAsync(MenuItem menuItem)
        {
            _context.MenuItems.Update(menuItem);
        }

        public async Task DeleteMenuItemAsync(MenuItem menuItem)
        {
            _context.MenuItems.Remove(menuItem);
        }

        public async Task<bool> CategoryExistsAsync(int categoryId)
        {
            return await _context.FoodCategories.AnyAsync(c => c.Id == categoryId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
