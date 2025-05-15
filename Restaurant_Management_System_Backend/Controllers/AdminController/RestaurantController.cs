using Microsoft.AspNetCore.Mvc;
using System.Linq;
using resturantApi.Data;
using resturantApi.Models;
using resturantApi.Mappers;
using resturantApi.Interfaces;
using resturantApi.PasswordGenerate;
using resturantApi.Dtos.Restaurant;
using resturantApi.SMTP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using resturantApi.ResponseHandler;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "Admin")]
    public class RestaurantAdminController : ControllerBase
    {
        private readonly IRestaurantRepository _resRepo;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RestaurantAdminController(IRestaurantRepository resRepo, IWebHostEnvironment webHostEnvironment)
        {
            _resRepo = resRepo;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet]
        public IActionResult test()
        {
            var userId = User.FindFirst("id")?.Value;
            var userRole = User.FindFirst("role")?.Value;
            var claims = User.Claims.ToList();
            return Ok(claims);

        }

        [HttpGet("restaurants")]
        public async Task<IActionResult> GetAllResturant()
        {
                var Restaurants = await _resRepo.GetAllResturantAsyncAdmin();
                var restaurantDto = Restaurants.Select(r => r.ToDtoFromResturant());

                if (Restaurants == null || !Restaurants.Any())
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("No restaurants found.");
                    return NotFound(errorResponse);
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(
                    new { restaurants = restaurantDto },
                    "restaurants retrieved successfully."
                );
                return Ok(successResponse);
        }

        [HttpGet("restaurants/{restaurantId:int}")]
        public async Task<IActionResult> GetRestaurantById(int restaurantId)
        {
            var restaurant = await _resRepo.GetResturantByIdAsyncAdmin(restaurantId);
            if(restaurant == null)
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("No restaurant found");
                return NotFound(errorMessage);
            }

            var restaurantDto = restaurant.ToDtoFromResturant();
            
            if (!string.IsNullOrEmpty(restaurantDto.ImageUrl))
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                restaurantDto.ImageUrl = $"{baseUrl}/{restaurantDto.ImageUrl}";
            }
            
            var successResponse = ResponseHelper.CreateSuccessResponse(
                new {restaurant = restaurantDto},
                "Restaurant retrieved Successfully"
            );
            return Ok(successResponse);
        }

        [HttpPost("restaurants")]
        public async Task<IActionResult> CreateRestaurant(RestaurantCreateDto createDto)
        {
            var exist = await _resRepo.EmailMangerExist(createDto.ManagerEmail);

            if (exist)
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("This manager email is already registered with a restaurant.");
                return BadRequest(errorMessage);
            }

            if (string.IsNullOrEmpty(createDto.ManagerEmail) || string.IsNullOrEmpty(createDto.ManagerName))
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("Manager information is missing.");
                return BadRequest(errorMessage);
            }

            var manager = ManagerMapper.CreateManager(createDto.ManagerName, createDto.ManagerEmail, createDto.Password);

            var restaurantModel = await _resRepo.CreateRestaurantAsync(manager, createDto);

            if (restaurantModel == null)
            {
                var errorMessage = ResponseHelper.CreateErrorResponse("Failed to create restaurant.");
                return StatusCode(500, errorMessage);
            }

            var successResponse = ResponseHelper.CreateSuccessResponse(
                new { restaurant = restaurantModel.ToDtoFromResturant() },
                "Restaurant created successfully."
            );
            return Ok(successResponse);
        }
        [HttpDelete("restaurants/{restaurantId:int}")]
        public async Task<IActionResult> DeleteRestaurant(int restaurantId)
        {
            var isDeleted = await _resRepo.DeleteRestaurantAsync(restaurantId);

            if (!isDeleted)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("No restaurant found.");
                return NotFound(errorResponse);
            }

            var successResponse = ResponseHelper.CreateSuccessResponse<string>(
                default,
                "Restaurant deleted successfully."
            );
            return Ok(successResponse);
        }

        
        [HttpPut("restaurants/{restaurantId:int}")]
        public async Task<IActionResult> UpdateRestaurant(RestaurantUpdateDto requestDto, int restaurantId)
        {

                var restaurant = await _resRepo.UpdateRestaurantAsync(requestDto,restaurantId);
                if (restaurant == null)
                {
                    var errorMessage = ResponseHelper.CreateErrorResponse("Restaurant not found.");
                    return NotFound(errorMessage);
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(
                    new { restaurant = restaurant.ToDtoFromResturant() },
                    "Restaurant updated successfully."
                );
                return Ok(successResponse);
        }

        [HttpPut("restaurant/approve/{restaurantId:int}")]
        public async Task<IActionResult> ApproveRestaurant(int restaurantId)
        {
            var (success, message) = await _resRepo.ApproveRestaurantAsync(restaurantId);

            if (!success)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(message);
                return BadRequest(errorResponse);
            }

            var successResponse = ResponseHelper.CreateSuccessResponse<string>(
                default,
                message
            );
            return Ok(successResponse);
        }

        [HttpPut("restaurant/reject/{restaurantId:int}")]
        public async Task<IActionResult> RejectRestaurant(int restaurantId)
        {
            var (success, message) = await _resRepo.RejectRestaurantAsync(restaurantId);

            if (!success)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(message);
                return BadRequest(errorResponse);
            }

            return NoContent();
        }

        [HttpPost("restaurants/photo/{restaurantId:int}")]
        public async Task<IActionResult> UploadRestaurantPhoto(int restaurantId, [FromForm] RestaurantPhotoUploadDto photoDto)
        {
            var restaurant = await _resRepo.GetResturantByIdAsyncAdmin(restaurantId);
            if (restaurant == null)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Restaurant not found");
                return NotFound(errorResponse);
            }

            if (photoDto.Photo == null || photoDto.Photo.Length == 0)
                return BadRequest(ResponseHelper.CreateErrorResponse("No photo file provided."));

            string wwwrootPath = _webHostEnvironment.WebRootPath;
            string fileName = $"restaurant_{restaurantId}_{Guid.NewGuid()}_{photoDto.Photo.FileName}";
            string filePath = Path.Combine(wwwrootPath, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await photoDto.Photo.CopyToAsync(fileStream);
            }

            restaurant.ImageUrl = fileName;
            await _resRepo.UpdateRestaurantImageAsync(restaurant);

            return Ok(ResponseHelper.CreateSuccessResponse(new { imageUrl = fileName }, "Restaurant photo uploaded successfully"));
        }
    }
}