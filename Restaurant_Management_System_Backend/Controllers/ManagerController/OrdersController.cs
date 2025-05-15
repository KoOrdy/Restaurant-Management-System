using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using resturantApi.Interfaces;
using resturantApi.Models;
using resturantApi.ResponseHandler;
using resturantApi.Dtos.Order;
using System.Threading.Tasks;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/manager/orders")]
    [Authorize(Roles = "Manager")]
    public class OrdersControllerManager : ControllerBase
    {
        private readonly IOrdersRepository _ordersRepository;
        private readonly IMenuItemsRepository _menuItemsRepository;

        public OrdersControllerManager(IOrdersRepository ordersRepository, IMenuItemsRepository menuItemsRepository)
        {
            _ordersRepository = ordersRepository;
            _menuItemsRepository = menuItemsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRestaurantOrders()
        {
            try
            {
                var managerIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(managerIdClaim))
                {
                    return Unauthorized(ResponseHelper.CreateErrorResponse("Unauthorized: Manager ID not found in token."));
                }
                var managerId = int.Parse(managerIdClaim);

                var restaurant = await _menuItemsRepository.GetRestaurantByManagerIdAsync(managerId);
                if (restaurant == null)
                {
                    return NotFound(ResponseHelper.CreateErrorResponse("Restaurant not found for this manager."));
                }

                var orders = await _ordersRepository.GetOrdersByRestaurantIdAsync(restaurant.Id);
                if (orders == null || !orders.Any())
                {
                    return BadRequest(ResponseHelper.CreateErrorResponse("No orders found."));
                }

                return Ok(ResponseHelper.CreateSuccessResponse(new { orders }, "Orders retrieved successfully."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }

        [HttpPut("{orderId:int}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDto statusDto)
        {
            try
            {
                var managerIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(managerIdClaim))
                {
                    return Unauthorized(ResponseHelper.CreateErrorResponse("Unauthorized: Manager ID not found in token."));
                }

                var managerId = int.Parse(managerIdClaim);

                var restaurant = await _menuItemsRepository.GetRestaurantByManagerIdAsync(managerId);
                if (restaurant == null)
                {
                    return NotFound(ResponseHelper.CreateErrorResponse("Restaurant not found for this manager."));
                }

                var orders = await _ordersRepository.GetOrdersByRestaurantIdAsync(restaurant.Id);
                var order = orders.FirstOrDefault(o => o.Id == orderId);

                if (order == null)
                {
                    return NotFound(ResponseHelper.CreateErrorResponse("Order not found or does not belong to your restaurant."));
                }

                if (order.Status == "Delivered")
                {
                    return BadRequest(ResponseHelper.CreateErrorResponse("Cannot update status. Order has already been delivered."));
                }

                var result = await _ordersRepository.UpdateOrderStatusAsync(orderId, statusDto.NewStatus);
                if (!result)
                {
                    return BadRequest(ResponseHelper.CreateErrorResponse("Invalid status or order not found."));
                }

                return Ok(ResponseHelper.CreateSuccessResponse<object>(null, "Order status updated successfully."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }

    }
}
