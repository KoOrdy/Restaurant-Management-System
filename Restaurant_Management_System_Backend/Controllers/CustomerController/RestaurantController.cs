using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization; 
using resturantApi.Interfaces; 
using System.Linq; 
using resturantApi.Models;
using resturantApi.Dtos.Restaurant;
using System.Threading.Tasks; 
using resturantApi.ResponseHandler; 
using System;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/Customer")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantRepository _restaurantRepository;
        
        public RestaurantController(IRestaurantRepository restaurantRepository)
        {
            _restaurantRepository = restaurantRepository;
        }

        [HttpGet("restaurants")]
        public async Task<IActionResult> GetAllRestaurants()
        {
            try
            {
                var restaurants = await _restaurantRepository.GetAllRestaurantsAsync();

                if (restaurants == null || !restaurants.Any())
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("No restaurants found.");
                    return NotFound(errorResponse); // 404
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var retrievedRestaurants = restaurants.Select(r => new
                {
                    r.Id,
                    r.Name,
                    r.Description,
                    r.Location,
                    ImageUrl = !string.IsNullOrEmpty(r.ImageUrl) ? $"{baseUrl}/{r.ImageUrl}" : null
                });

                var successResponse = ResponseHelper.CreateSuccessResponse(new { restaurants = retrievedRestaurants }, "Restaurants retrieved successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse); 
            }
        }

        [HttpGet("restaurants/{restaurantId:int}")]
        public async Task<IActionResult> GetRestaurantById(int restaurantId)
        {
            try
            {
                var restaurantDetails = await _restaurantRepository.GetRestaurantByIdAsync(restaurantId);
                if (restaurantDetails == null)
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Restaurant not found.");
                    return NotFound(errorResponse); 
                }

                // Update Image URLs
                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                foreach (var category in restaurantDetails.Categories)
                {
                    foreach (var menuItem in category.MenuItems)
                    {
                        menuItem.ImageUrl = !string.IsNullOrEmpty(menuItem.ImageUrl)
                            ? $"{baseUrl}/{menuItem.ImageUrl}"
                            : null;

                        Console.WriteLine($"MenuItem {menuItem.Id} - ImageUrl: {menuItem.ImageUrl}");
                    }
                }

                var formattedResponse = new
                {
                    Categories = restaurantDetails.Categories.Select(category => new {
                        category.Id,
                        category.Name,
                        MenuItems = category.MenuItems.Select(item => new {
                            item.Id,
                            item.Name,
                            item.Description,
                            item.Price,
                            item.Availability,
                            imageUrl = item.ImageUrl
                        }).ToList()
                    }).ToList(),
                };

                var successResponse = ResponseHelper.CreateSuccessResponse(
                    formattedResponse,
                    "Restaurant details retrieved successfully."
                );

                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }

        [HttpGet("restaurants/managers")]
         [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetRestaurantDataByID()
        {
            try
            {
                var restaurantData = await _restaurantRepository.GetRestaurantDataByIDAsync();
                if (restaurantData == null)
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Restaurant not found.");
                    return NotFound(errorResponse); 
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                foreach (var restaurant in restaurantData)
                {
                    restaurant.ImageUrl = !string.IsNullOrEmpty(restaurant.ImageUrl)
                        ? $"{baseUrl}/{restaurant.ImageUrl}"
                        : null;
                }
                var successResponse = ResponseHelper.CreateSuccessResponse(restaurantData, "Restaurant data retrieved successfully.");
                return Ok(successResponse);
            }
            catch(Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }
    }
}
