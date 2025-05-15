using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Auth;
using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Interfaces;
using resturantApi.Data;
using Microsoft.EntityFrameworkCore.Internal;

namespace resturantApi.Repository
{
    public class AuthRepository :IAuthRepository 
    {
        private readonly ApplicationDBContext _context;
        public AuthRepository(ApplicationDBContext context)
        {
            _context=context;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User> RegisterAsync(User userModel)
        {
            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
            return userModel;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
        
        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }

            return user;
        }
    }
}