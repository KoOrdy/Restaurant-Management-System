using resturantApi.Models; 
using resturantApi.Dtos.Restaurant; 
using resturantApi.Models; 
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace resturantApi.Interfaces
{
    public interface IRestaurantRepository
    {
        Task<List<RestaurantDto>> GetAllRestaurantsAsync();
        Task<RestaurantDetailsDto> GetRestaurantByIdAsync(int restaurantId);
        Task<List<RestaurantManagerDto>> GetRestaurantDataByIDAsync();

        Task<List<Restaurant>> GetAllResturantAsyncAdmin();
        Task<Restaurant> GetResturantByIdAsyncAdmin(int restaurantId);
        Task<bool> EmailMangerExist(string Email);
        Task<Restaurant?> CreateRestaurantAsync(User mangerModel,RestaurantCreateDto createDto);
        Task<Restaurant?> UpdateRestaurantAsync(RestaurantUpdateDto requestDto, int restaurantId);
        Task<bool> DeleteRestaurantAsync(int restaurantId);
        Task<(bool Success, string Message)> ApproveRestaurantAsync(int restaurantId);
        Task<(bool Success, string Message)> RejectRestaurantAsync(int restaurantId);

        Task<bool> UpdateRestaurantImageAsync(Restaurant restaurant);
    }
}