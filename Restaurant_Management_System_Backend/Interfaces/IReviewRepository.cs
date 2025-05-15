using resturantApi.Models; 
using resturantApi.Dtos.Review; 
using resturantApi.Models; 
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace resturantApi.Interfaces
{
    public interface IReviewRepository
    {
        Task<bool> AddReviewAsync(ReviewRequestDto reviewRequestDto, int customerId, int restaurantId);
        Task<List<ReviewDto>> GetReviewsByRestaurantIdAsync(int restaurantId);
    }
}