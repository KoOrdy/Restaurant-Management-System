using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Restaurant;
using resturantApi.Models;

namespace resturantApi.Mappers
{
    public static class ManagerMapper
    {
        public static User CreateManager(string name, string email, string password)
        {
            return new User
            {
                Name = name,
                Email = email,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Role = "Manager",
                CreatedAt = DateTime.UtcNow
            };
        }

    }
}