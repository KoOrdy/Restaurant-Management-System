using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Auth;
using resturantApi.Models;

namespace resturantApi.Interfaces
{
    public interface IMenuItemsRepository
    {
        Task<Restaurant?> GetRestaurantByManagerIdAsync(int managerId);
        Task<List<MenuItem>> GetMenuItemsByRestaurantIdAsync(int restaurantId);
        Task<MenuItem?> GetMenuItemByIdAsync(int id, int restaurantId);
        Task AddMenuItemAsync(MenuItem menuItem);
        Task UpdateMenuItemAsync(MenuItem menuItem);
        Task DeleteMenuItemAsync(MenuItem menuItem);
        Task<bool> CategoryExistsAsync(int categoryId);
        Task SaveChangesAsync();
    }

}