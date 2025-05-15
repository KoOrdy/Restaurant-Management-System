using Microsoft.AspNetCore.Mvc;
using System.Linq;
using resturantApi.Data;
using resturantApi.Dtos.Auth;
using resturantApi.Dtos.Restaurant;
using resturantApi.Models;
using resturantApi.Mappers;
using resturantApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using resturantApi.ResponseHandler;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly IAuthRepository _auth;
        private readonly ApplicationDBContext _context;


        public AuthController( ApplicationDBContext context, JwtService jwtService,IAuthRepository auth)
        {
            _jwtService = jwtService;
            _auth=auth;
            _context=context;
        }

        [HttpPost("register-customer")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _auth.EmailExistsAsync(dto.Email))
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("Email already exist");
                return BadRequest(errorMessage);
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = dto.ToUserFromDto(hashedPassword);
            await _auth.RegisterAsync(user);

            var successResponse = ResponseHelper.CreateSuccessResponse<string>(
                    default,
                    "User registered successfully."
            );
            return Accepted(successResponse);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            } 
            var user = await _auth.LoginAsync(dto.Email, dto.password);

            if (user == null)
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("Invalid email or password.");
                return Unauthorized(errorMessage);
            }

            var token = _jwtService.GenerateToken(user);
            var successResponse = ResponseHelper.CreateSuccessResponse(
                    new{Token=token},
                    "User login successfully."
            );
            return Ok(successResponse);
        }
        [HttpPost("register-manager")]
        public async Task<IActionResult> CreateRestaurantRequest([FromBody] RestaurantRequestDto requestDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == requestDto.ManagerEmail);
            if (existingUser != null)
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("This manager email is already registered with restaurant.");
                return BadRequest(errorMessage);
            }
            var existingemailResturant = await _context.Restaurants.FirstOrDefaultAsync(r => r.ManagerEmail == requestDto.ManagerEmail);
            if(existingemailResturant != null)
            {    
                var errorMessage = ResponseHelper.CreateErrorResponse("This manager email is already registered with restaurant.");
                return BadRequest(errorMessage);
            }
            await _context.Restaurants.AddAsync(requestDto.ToResturantFromDto());
            await _context.SaveChangesAsync();
            var successResponse = ResponseHelper.CreateSuccessResponse<string>(
                    default,
                    "Restaurant request submitted successfully. Awaiting admin approval."
            );
            return Accepted(successResponse);

        }
    }
}
