using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using resturantApi.Dtos.Restaurant;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using resturantApi.ResponseHandler;
using resturantApi.Data;
using Microsoft.EntityFrameworkCore;
using resturantApi.Dtos.Table;

namespace resturantApi.Controllers.ManagerController
{
    [ApiController]
    [Route("api")]
    public class TableController : ControllerBase
    {
        private readonly ITableRepository _tableRepository;

        public TableController(ITableRepository tableRepository)
        {
            _tableRepository = tableRepository;
        }
        private int? GetUserId()
        {
            var userIdString = User.FindFirst("id")?.Value;
            if (int.TryParse(userIdString, out int userId))
                return userId;
            return null;
        }

        [HttpGet("tables/{restaurantId:int}")]
        public async Task<IActionResult> GetTableByResaurantId(int restaurantId)
        {
            var tables = await _tableRepository.GetTablesByRestaurantIdAsync(restaurantId);
            if (!tables.Any())
                return BadRequest(ResponseHelper.CreateErrorResponse("No tables found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { tables }, "Tables retrieved"));
        }

        [HttpGet("manager/tables")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetTables()
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var tables = await _tableRepository.GetTablesByManagerIdAsync(userId.Value);
            if (!tables.Any())
                return BadRequest(ResponseHelper.CreateErrorResponse("No tables found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { tables }, "Tables retrieved"));
        }

        [HttpPost("manager/tables")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> CreateTable(TableRequestDto tableRequestDto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var createdTable = await _tableRepository.CreateTableAsync(userId.Value, tableRequestDto);
            if (createdTable == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Table name already exists or restaurant not found."));

            return Ok(ResponseHelper.CreateSuccessResponse(new { table = createdTable }, "Table created successfully."));
        }

        [HttpDelete("manager/tables/{tableId:int}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> DeleteTable(int tableId)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var deleted = await _tableRepository.DeleteTableAsync(userId.Value, tableId);
            if (!deleted)
                return NotFound(ResponseHelper.CreateErrorResponse("Table not found for this restaurant."));

            return Ok(ResponseHelper.CreateSuccessResponse<string>(null, "Table deleted successfully."));
        }   

    }
}