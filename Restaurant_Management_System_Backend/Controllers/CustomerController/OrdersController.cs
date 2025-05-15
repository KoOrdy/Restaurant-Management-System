using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization; 
using resturantApi.Interfaces; 
using System.Linq; 
using resturantApi.Models;
using resturantApi.Dtos.Order;
using System.Threading.Tasks; 
using resturantApi.ResponseHandler; 

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/Customer")]
    [Authorize(Roles = "Customer")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _ordersRepository;

        public OrdersController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpPost("restaurants/{restaurantId:int}/reservations/{reservationId:int}/MakeOrder")]
        public async Task<IActionResult> MakeOrder([FromBody] OrderRequestDto orderRequestDto, int restaurantId, int reservationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ResponseHelper.CreateErrorResponse("Invalid order data."));
            }

            try
            {
                var customerIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(customerIdClaim))
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: Customer ID not found in token.");
                    return Unauthorized(errorResponse);
                }
                var customerId = int.Parse(customerIdClaim);

                var (OrderStatus, ErrorMessage) = await _ordersRepository.MakeOrderAsync(orderRequestDto, customerId, restaurantId, reservationId);
                if(OrderStatus == false && !string.IsNullOrEmpty(ErrorMessage))
                {
                    return BadRequest(ResponseHelper.CreateErrorResponse(ErrorMessage));
                }

                return Ok(ResponseHelper.CreateSuccessResponse<object>(null, "Order placed successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }

        [HttpPut("CancelOrder/{orderId:int}")]
        public async Task<IActionResult> CancelOrder(int orderId)
        {
            try
            {
                var order = await _ordersRepository.CancelOrderAsync(orderId);
                if(order == false)
                {
                    return NotFound(ResponseHelper.CreateErrorResponse("Order not found"));
                }

                return Ok(ResponseHelper.CreateSuccessResponse<object>(null, "Order cancelled successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }

    }
}