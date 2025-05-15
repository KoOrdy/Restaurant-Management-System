using Microsoft.AspNetCore.Mvc;
using resturantApi.Mappers;
using resturantApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using resturantApi.ResponseHandler;
using resturantApi.Dtos.Users;
using resturantApi.Data;

namespace resturantApi.Controllers.AdminController
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly ApplicationDBContext _context;
    public UserController(ApplicationDBContext context,IUserRepository userRepo)
    {
        _userRepo = userRepo;
        _context=context;
    }
        [HttpGet]
        public async Task<IActionResult> GetAllUsersByRole([FromQuery] string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Role is required.");
                return BadRequest(errorResponse);
            }

            if (role != "Manager" && role != "Customer")
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Role not found.");
                return BadRequest(errorResponse);
            }

            var users = await _userRepo.GetAllUsersByRoleAsync(role);

            var successResponse = ResponseHelper.CreateSuccessResponse(
                new { users = users },
                "Users retrieved successfully."
            );

            return Ok(successResponse);
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userRepo.GetUserByIdAsync(userId);
            if (user == null)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("User not found.");
                return NotFound(errorResponse);
            }

            var userDto = user.ToUserDto();

            if (user.Role == "Manager")
            {
                var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.ManagerId == user.Id);
                if (restaurant != null)
                {
                    var restaurantData = restaurant.ToDtoFromResturant();

                    var successResponseWithRestaurant = ResponseHelper.CreateSuccessResponse(
                        new
                        {
                            user = userDto,
                            restaurant = restaurantData
                        },
                        "User and restaurant retrieved successfully."
                    );
                    return Ok(successResponseWithRestaurant);
                }
            }

    // لو مش مانجر أو مانجر مالوش مطعم
    var successResponse = ResponseHelper.CreateSuccessResponse(
        new { user = userDto },
        "User retrieved successfully."
    );

    return Ok(successResponse);
}

        [HttpDelete("{userId:int}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var isDeleted = await _userRepo.DeleteUserAsync(userId);
            if (!isDeleted)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("User not found");
                return BadRequest(errorResponse);
            }

            var successResponse = ResponseHelper.CreateSuccessResponse<string>(
                default,
                "User deleted successfully."
            );

            return Ok(successResponse);
        }

        [HttpPut("{userId:int}")]
        public async Task<IActionResult> UpdateUser(int userId, UpdateUserDto userDto)
        {
            var updatedUser = await _userRepo.UpdateUserAsync(userId, userDto);
            if (updatedUser == null)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("User not found");
                return BadRequest(errorResponse);
            }

            var successResponse = ResponseHelper.CreateSuccessResponse(
                new { user = updatedUser.ToUserDto() },
                "User updated successfully."
            );

            return Ok(successResponse);
        }
    }

}
