using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization; 
using resturantApi.Interfaces; 
using System.Linq; 
using resturantApi.Models;
using resturantApi.Dtos.Reservation;
using resturantApi.Dtos.Order;
using System.Threading.Tasks; 
using resturantApi.ResponseHandler; 

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/Customer")]
    [Authorize(Roles = "Customer")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsRepository _reservationsRepository;

        public ReservationsController(IReservationsRepository reservationsRepository)
        {
            _reservationsRepository = reservationsRepository;
        }

        [HttpPost("restaurants/{restaurantId:int}/MakeReservation")]
        public async Task<IActionResult> MakeReservation(int restaurantId, [FromBody] ReservationRequestDto reservationRequestDto)
        {
            if (!ModelState.IsValid)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Invalid reservation data.");
                return BadRequest(errorResponse);
            }

            var customerIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(customerIdClaim))
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: Customer ID not found in token.");
                return Unauthorized(errorResponse);
            }

            var customerId = int.Parse(customerIdClaim);

            try
            {
                var (reservationDto, errorMessage) = await _reservationsRepository.MakeReservationAsync(reservationRequestDto, customerId, restaurantId);

                if (!string.IsNullOrEmpty(errorMessage))
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse(errorMessage);
                    return BadRequest(errorResponse); 
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(new { Reservation = reservationDto }, "Reservation made successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }


        [HttpPut("reservations/{reservationId:int}/reschedule")]
        public async Task<IActionResult> RescheduleReservation(int reservationId, [FromBody] RescheduleReservationDto rescheduleReservationDto)
        {
            if (!ModelState.IsValid)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Invalid reschedule data.");
                return BadRequest(errorResponse);
            }
            try
            {
                var (UpdatedReservation, errorMessage) = await _reservationsRepository.RescheduleReservationAsync(reservationId , rescheduleReservationDto);
                if(!string.IsNullOrEmpty(errorMessage))
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse(errorMessage);
                    return BadRequest(errorResponse); // or NotFound if you prefer for availability errors
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(new { Reservation = UpdatedReservation }, "Reservation rescheduled successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }

        [HttpDelete("reservations/{reservationId:int}")]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            try
            {
                var isDeleted = await _reservationsRepository.DeleteReservationAsync(reservationId);
                if (!isDeleted)
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Deletion failed! Reservation not found.");
                    return NotFound(errorResponse);
                }

                var successResponse = ResponseHelper.CreateSuccessResponse<object>(null, "Reservation deleted successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }

        [HttpGet("reservations")]
        public async Task<IActionResult> GetAllReservations()
        {
            var customerIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(customerIdClaim))
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: Customer ID not found in token.");
                return Unauthorized(errorResponse);
            }
            
            var customerId = int.Parse(customerIdClaim);

            try
            {
                var reservations = await _reservationsRepository.GetAllReservationsAsync(customerId);
                if (reservations == null || !reservations.Any())
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("No reservations found.");
                    return NotFound(errorResponse);
                }

                var reservationsData = reservations.Select(r => new
                {
                    r.Id,
                    r.RestaurantId,
                    r.RestaurantName,
                    r.ReservationDate,
                    r.StartTime,
                    r.EndTime,
                    r.NumberOfGuests,
                    r.Status,
                    Order = r.OrderDto != null ? new
                    {
                        r.OrderDto.Id,
                        r.OrderDto.Status,
                        r.OrderDto.TotalAmount,
                        OrderItems = r.OrderDto.OrderItems.Select(oi => new
                        {
                            oi.MenuItemName,
                            oi.MenuItemId,
                            oi.Quantity,
                            oi.UnitPrice
                        }).ToList()
                    } : null
                }).ToList();

                var successResponse = ResponseHelper.CreateSuccessResponse(new
                {
                    Reservations = reservationsData
                }, "Reservations retrieved successfully.");

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
