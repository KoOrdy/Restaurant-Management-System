using Microsoft.AspNetCore.Http;

namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantPhotoUploadDto
    {
        public IFormFile Photo { get; set; }
    }
} 