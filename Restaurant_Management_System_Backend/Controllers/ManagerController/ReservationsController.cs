using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using resturantApi.Interfaces;
using resturantApi.ResponseHandler;
using System.Threading.Tasks;
using resturantApi.SMTP;
using resturantApi.Data;
using Microsoft.EntityFrameworkCore;

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/manager/reservations")]
    [Authorize(Roles = "Manager")]
    public class ReservationsControllerManager : ControllerBase
    {
        private readonly IReservationsRepository _reservationsRepository;
        private readonly IMenuItemsRepository _menuItemsRepository;

        public ReservationsControllerManager(ApplicationDBContext context, IReservationsRepository reservationsRepository, IMenuItemsRepository menuItemsRepository)
        {
            _reservationsRepository = reservationsRepository;
            _menuItemsRepository = menuItemsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRestaurantReservations()
        {

            var managerIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(managerIdClaim))
                return BadRequest(ResponseHelper.CreateErrorResponse("Unauthorized: Manager ID not found in token."));

            var managerId = int.Parse(managerIdClaim);
            var restaurant = await _menuItemsRepository.GetRestaurantByManagerIdAsync(managerId);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Restaurant not found for this manager."));

            var reservations = await _reservationsRepository.GetRestaurantReservationsAsync(restaurant.Id);
            if (reservations == null || !reservations.Any())
                return BadRequest(ResponseHelper.CreateErrorResponse("No reservations found."));

            return Ok(ResponseHelper.CreateSuccessResponse(new { reservations }, "Reservations retrieved successfully."));
        }

        [HttpPut("reject/{reservationId:int}")]
        public async Task<IActionResult> RejectReservationStatus(int reservationId)
        {
            var managerIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(managerIdClaim))
                return BadRequest(ResponseHelper.CreateErrorResponse("Unauthorized: Manager ID not found in token."));

            var managerId = int.Parse(managerIdClaim);

            var restaurant = await _menuItemsRepository.GetRestaurantByManagerIdAsync(managerId);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Restaurant not found for this manager."));

            var reservation = await _reservationsRepository.GetReservationByIdAsync(reservationId);
            if (reservation == null || reservation.RestaurantId != restaurant.Id)
                return BadRequest(ResponseHelper.CreateErrorResponse("Reservation not found for your restaurant."));

            var success = await _reservationsRepository.RejectReservationAsync(reservationId);
            if (!success)
                return BadRequest(ResponseHelper.CreateErrorResponse("Reservation cannot be rejected."));

            return Ok(ResponseHelper.CreateSuccessResponse<string>(null, "Reservation rejected successfully."));
        }
        

        [HttpPut("accept/{reservationId:int}")]
        public async Task<IActionResult> AcceptReservationStatus(int reservationId)
        {
            var managerIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(managerIdClaim))
                return BadRequest(ResponseHelper.CreateErrorResponse("Unauthorized: Manager ID not found in token."));

            var managerId = int.Parse(managerIdClaim);

            var restaurant = await _menuItemsRepository.GetRestaurantByManagerIdAsync(managerId);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Restaurant not found for this manager."));

            var reservation = await _reservationsRepository.GetReservationByIdAsync(reservationId);
            if (reservation == null || reservation.RestaurantId != restaurant.Id)
                return BadRequest(ResponseHelper.CreateErrorResponse("Reservation not found for your restaurant."));

            var (success, errorMsg) = await _reservationsRepository.AcceptReservationAsync(reservationId);
            if (!success)
             return BadRequest(ResponseHelper.CreateErrorResponse(errorMsg ?? "Reservation cannot be accepted."));

            var emailBody = $@"
            Hello {reservation.Customer?.Name},

            We're excited to let you know that your reservation (Reservation Number: {reservation.Id}) on {reservation.ReservationDate:MMMM dd, yyyy} at {reservation.StartTime} has been accepted.

            Please keep this number handy – you'll need it when placing your order at the restaurant.

            Thank you for choosing us!";
            if (reservation.Customer != null)
                Mailer.SendEmail(reservation.Customer.Email, "Reservation Accepted", emailBody);

            return Ok(ResponseHelper.CreateSuccessResponse<string>(null, "Reservation accepted and email sent successfully."));
        }

        [HttpPut("mark-finished")]
        public async Task<IActionResult> MarkPastReservationsAsFinished()
        {
            try
            {
                var updatedCount = await _reservationsRepository.MarkPastReservationsAsFinishedAsync();
                var message = $"{updatedCount} reservation(s) marked as Finished.";
                return Ok(ResponseHelper.CreateSuccessResponse(new { Count = updatedCount }, message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ResponseHelper.CreateErrorResponse(ex.Message));
            }
        }


    }
}
