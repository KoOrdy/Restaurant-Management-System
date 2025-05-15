using Microsoft.AspNetCore.Http;

namespace resturantApi.Dtos.Restaurant
{
    public class MenuItemPhotoUploadDto
    {
        public IFormFile Photo { get; set; }
    }
} 