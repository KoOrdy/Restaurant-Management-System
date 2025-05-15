using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resturantApi.Data;
using resturantApi.Interfaces;
using resturantApi.Models;
using resturantApi.ResponseHandler;

namespace resturantApi.Controllers.AdminController
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class MonitoringController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrdersRepository _ordersRepository;
        private readonly IReservationsRepository _reservationsRepository;



        public MonitoringController(ApplicationDBContext context,IOrdersRepository ordersRepository,IReservationsRepository reservationsRepository)
        {
            _context = context;
            _ordersRepository=ordersRepository;
            _reservationsRepository=reservationsRepository;
        }

        [HttpGet("orders/{restaurantId:int}")]
        public async Task<IActionResult> GetRestaurantOrders(int restaurantId)
        {
            try
            {
                var restaurant = await _context.Restaurants.FirstOrDefaultAsync(u => u.Id == restaurantId);
                if(restaurant == null)
                {
                    return BadRequest(ResponseHelper.CreateErrorResponse("No restaurant found."));
                }

                var orders = await _ordersRepository.GetOrdersByRestaurantIdAsync(restaurantId);
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

        [HttpGet("reservations/{restaurantId:int}")]
        public async Task<IActionResult> GetRestaurantReservations(int restaurantId)
        {
            try{
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(u => u.Id == restaurantId);
            if(restaurant == null)
             {
                return BadRequest(ResponseHelper.CreateErrorResponse("No restaurant found."));
             }
            
            var reservations = await _reservationsRepository.GetRestaurantReservationsAsync(restaurantId);
            if (reservations == null || !reservations.Any())
                return BadRequest(ResponseHelper.CreateErrorResponse("No reservations found."));

            return Ok(ResponseHelper.CreateSuccessResponse(new { reservations }, "Reservations retrieved successfully."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }
        
        
    }
} 