using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Restaurant;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class RestaurantMapper
    {

        public static Restaurant ToResturantFromDto(this RestaurantRequestDto dto)
        {
            return new Restaurant
            {
                Name=dto.Name,
                Description=dto.Description,
                Location = dto.Location,
                ManagerId = dto.ManagerId,
                ManagerEmail=dto.ManagerEmail,
                ManagerName=dto.ManagerName,
                Status="Pending",
                ImageUrl=dto.ImageUrl
            };
        } 

        public static RestaurantDto ToDtoFromResturant(this Restaurant restaurantModel)
        {
            return new RestaurantDto
            {
                Id=restaurantModel.Id,
                Name=restaurantModel.Name,
                Description=restaurantModel.Description,
                Location = restaurantModel.Location,
                ManagerEmail=restaurantModel.ManagerEmail,
                ManagerName=restaurantModel.ManagerName,
                Status=restaurantModel.Status,
                ImageUrl=restaurantModel.ImageUrl
                
            };
        }

        public static Restaurant ToCreateResturantFromDto(this RestaurantCreateDto dto , int mangerId)
        {
            return new Restaurant
            {
                Name=dto.Name,
                Description=dto.Description,
                Location = dto.Location,
                ManagerId = mangerId,
                ManagerEmail=dto.ManagerEmail,
                ManagerName=dto.ManagerName,
                Status="Approved",
                ImageUrl=dto.ImageUrl
            };
        } 

    }

}