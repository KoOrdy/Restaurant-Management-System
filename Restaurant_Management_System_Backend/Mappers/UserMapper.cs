using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Users;
using resturantApi.Models;

namespace resturantApi.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                Id=userModel.Id,
                Name=userModel.Name,
                Email=userModel.Email,
                Role=userModel.Role
            };
        }
    }
}