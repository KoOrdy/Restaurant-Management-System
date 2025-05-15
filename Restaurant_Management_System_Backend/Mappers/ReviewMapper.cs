using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Review;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class ReviewMapper
    {
        public static Review ToReviewFromDto(this ReviewRequestDto dto , int customerId , int restaurantId)
        {
            return new Review
            {
                CustomerId = customerId,
                RestaurantId = restaurantId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                ReviewDate = dto.ReviewDate
            };
        }
    }
}