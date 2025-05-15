using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization; 
using resturantApi.Interfaces; 
using System.Linq; 
using resturantApi.Models;
using resturantApi.Dtos.Review;
using System.Threading.Tasks; 
using resturantApi.ResponseHandler; 
using System;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/Customer")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        [HttpPost("restaurants/{restaurantId:int}/AddReview")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> AddReview(int restaurantId , [FromBody] ReviewRequestDto reviewRequestDto)
        {
            if (!ModelState.IsValid)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Invalid review data.");
                return BadRequest(errorResponse);
            }

            try
            {
                var customerIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(customerIdClaim))
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: Customer ID not found in token.");
                    return Unauthorized(errorResponse);
                }
                var CustomerId = int.Parse(customerIdClaim);

                var IsReviewAdded = _reviewRepository.AddReviewAsync(reviewRequestDto, CustomerId, restaurantId);
                if(!IsReviewAdded.Result)
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Failed to add review.");
                    return NotFound(errorResponse);
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(new { Review = reviewRequestDto }, "Review added successfully.");
                return Ok(successResponse);
            }
            catch(Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }
        
        [HttpGet("restaurants/{restaurantId:int}/reviews")]
        public async Task<IActionResult> GetReviewsByRestaurantId(int restaurantId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByRestaurantIdAsync(restaurantId);
                if (reviews == null || !reviews.Any())
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("No reviews found for this restaurant.");
                    return NotFound(errorResponse);
                }

                var successResponse  = ResponseHelper.CreateSuccessResponse(new { Reviews = reviews }, "Reviews retrieved successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }
    }
}