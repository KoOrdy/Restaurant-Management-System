using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;
using resturantApi.Dtos.Restaurant;
using Microsoft.AspNetCore.Http;

namespace resturantApi.Mappers
{
    public static class MenuItemsMapper
    {
        public static MenuItem ToMenuItemFromCreateDto(this MenuItemCreateUpdateDto dto, int restaurantId)
        {
            return new MenuItem
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Availability = dto.Availability,
                RestaurantId = restaurantId,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl
            };
        }

        public static MenuItemResponseDto ToMenuItemResponseDto(this MenuItem menuItem)
        {
            return new MenuItemResponseDto
            {
                Id = menuItem.Id,
                Name = menuItem.Name,
                Description = menuItem.Description,
                Price = menuItem.Price,
                Availability = menuItem.Availability,
                CategoryId = menuItem.CategoryId,
                Category = menuItem.Category != null ? menuItem.Category.Name : null, 
                ImageUrl = menuItem.ImageUrl
            };
        }

        public static MenuItemResponseDto ToMenuItemResponseDto(this MenuItem menuItem, HttpRequest request)
        {
            var baseUrl = $"{request.Scheme}://{request.Host}";
            
            return new MenuItemResponseDto
            {
                Id = menuItem.Id,
                Name = menuItem.Name,
                Description = menuItem.Description,
                Price = menuItem.Price,
                Availability = menuItem.Availability,
                CategoryId = menuItem.CategoryId,
                Category = menuItem.Category != null ? menuItem.Category.Name : null,
                ImageUrl = !string.IsNullOrEmpty(menuItem.ImageUrl) ? $"{baseUrl}/{menuItem.ImageUrl}" : null
            };
        }
    }
}