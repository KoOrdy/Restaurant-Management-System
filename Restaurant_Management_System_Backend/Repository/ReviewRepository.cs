using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Dtos.Review;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using resturantApi.Data;
using resturantApi.SMTP;
using resturantApi.PasswordGenerate;


namespace resturantApi.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDBContext _context;
        public ReviewRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> AddReviewAsync(ReviewRequestDto reviewRequestDto, int customerId, int restaurantId)
        {
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == restaurantId);
            if (!restaurantExists)
            {
                return false; 
            }

            var review = ReviewMapper.ToReviewFromDto(reviewRequestDto, customerId, restaurantId);
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ReviewDto>> GetReviewsByRestaurantIdAsync(int restaurantId)
        {
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == restaurantId);
            if (!restaurantExists)
            {
                return null; 
            }

            return await _context.Reviews
                .Where(r => r.RestaurantId == restaurantId)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    CustomerId = r.CustomerId ?? 0,
                    RestaurantId = r.RestaurantId ?? 0,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    ReviewDate = r.ReviewDate
                })
                .ToListAsync();
        }
    }
}