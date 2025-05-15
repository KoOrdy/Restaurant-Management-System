using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Auth;
using resturantApi.Models;
namespace resturantApi.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> RegisterAsync(User userModel);
        Task<bool> EmailExistsAsync(string email);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> LoginAsync(string email, string password);
    }
}