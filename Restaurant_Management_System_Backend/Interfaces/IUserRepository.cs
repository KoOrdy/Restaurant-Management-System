using resturantApi.Dtos.Users; 
using resturantApi.Models; 

namespace resturantApi.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserDto>> GetAllUsersByRoleAsync(string role);    
        Task<bool> DeleteUserAsync(int userId);
        Task<User?> UpdateUserAsync(int userId, UpdateUserDto userDto);
        Task<User?> GetUserByIdAsync(int userId);

    }
}