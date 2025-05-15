using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Auth;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class AuthMapper
    {
    public static User ToUserFromDto(this RegisterDto dto, string hashedPassword)
    {
        return new User
        {
            Name = dto.Name,
            Email=dto.Email,
            Password = hashedPassword,
            Role="Customer"
        };
    }
    }
}
