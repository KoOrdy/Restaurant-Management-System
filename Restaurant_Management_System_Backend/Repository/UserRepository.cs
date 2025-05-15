using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Dtos.Users;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using resturantApi.Data;

namespace resturantApi.Repository
{
    public class UserRepository : IUserRepository
{
    private readonly ApplicationDBContext _context;

    public UserRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<List<UserDto>> GetAllUsersByRoleAsync(string role)
    {
        var users = await _context.Users
            .Where(u => u.Role == role)
            .ToListAsync();

        var userDtos = users.Select(u => u.ToUserDto()).ToList();
        return userDtos;
    }

    public async Task<bool> DeleteUserAsync(int userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
            return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<User?> UpdateUserAsync(int userId, UpdateUserDto userDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
            return null;

        if (!string.IsNullOrEmpty(userDto.Email))
        {
            user.Email = userDto.Email;
        }

        if (!string.IsNullOrEmpty(userDto.Name))
        {
            user.Name = userDto.Name;
        }

        await _context.SaveChangesAsync();
        return user;
    }
    public async Task<User?> GetUserByIdAsync(int userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }
}
}