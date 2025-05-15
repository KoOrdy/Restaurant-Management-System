using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using resturantApi.Dtos.Restaurant;
using resturantApi.Interfaces;
using resturantApi.Mappers;
using resturantApi.ResponseHandler;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;

namespace resturantApi.Controllers
{
    [Route("api/manager/menu-items")]
    [ApiController]
    [Authorize(Roles = "Manager")]
    public class MenuItemsController : ControllerBase
    {
        private readonly IMenuItemsRepository _menuItemRepo;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MenuItemsController(IMenuItemsRepository menuItemRepo, IWebHostEnvironment webHostEnvironment)
        {
            _menuItemRepo = menuItemRepo;
            _webHostEnvironment = webHostEnvironment;
        }

        private int? GetUserId()
        {
            var userIdString = User.FindFirst("id")?.Value;
            if (int.TryParse(userIdString, out int userId))
                return userId;
            return null;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuItems()
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var menuItems = await _menuItemRepo.GetMenuItemsByRestaurantIdAsync(restaurant.Id);
            if (menuItems.Count == 0)
                return BadRequest(ResponseHelper.CreateErrorResponse("No menu item found"));

            var menuItemDtos = menuItems.Select(m => m.ToMenuItemResponseDto(Request));
            return Ok(ResponseHelper.CreateSuccessResponse(new { menuItems = menuItemDtos }, "Menu items retrieved successfully"));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItemById(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var menuItem = await _menuItemRepo.GetMenuItemByIdAsync(id, restaurant.Id);
            if (menuItem == null)
                return NotFound(ResponseHelper.CreateErrorResponse("Menu item not found."));

            var menuItemDto = menuItem.ToMenuItemResponseDto(Request);
            return Ok(ResponseHelper.CreateSuccessResponse(new { menuItem = menuItemDto }, "Menu item retrieved successfully"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMenuItem([FromBody] MenuItemCreateUpdateDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var categoryExists = await _menuItemRepo.CategoryExistsAsync(dto.CategoryId);
            if (!categoryExists)
                return BadRequest(ResponseHelper.CreateErrorResponse("Invalid category ID."));

            var menuItem = dto.ToMenuItemFromCreateDto(restaurant.Id);
            await _menuItemRepo.AddMenuItemAsync(menuItem);
            await _menuItemRepo.SaveChangesAsync();

            return Ok(ResponseHelper.CreateSuccessResponse<string>(null, "Menu item created successfully."));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenuItem(int id, [FromBody] MenuItemCreateUpdateDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var menuItem = await _menuItemRepo.GetMenuItemByIdAsync(id, restaurant.Id);
            if (menuItem == null)
                return NotFound(ResponseHelper.CreateErrorResponse("Menu item not found."));

            if (!string.IsNullOrEmpty(dto.Name))
                menuItem.Name = dto.Name;

            if (!string.IsNullOrEmpty(dto.Description))
                menuItem.Description = dto.Description;

            if (dto.Price != 0)
                menuItem.Price = dto.Price;

            menuItem.Availability = dto.Availability;

            if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                menuItem.ImageUrl = dto.ImageUrl.Replace("http://localhost:5135/", "");
            }

            if (dto.CategoryId != 0)
                menuItem.CategoryId = dto.CategoryId;

            await _menuItemRepo.UpdateMenuItemAsync(menuItem);
            await _menuItemRepo.SaveChangesAsync();

            return Ok(ResponseHelper.CreateSuccessResponse(new { menuItem = menuItem.ToMenuItemResponseDto() }, "Menu item updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var menuItem = await _menuItemRepo.GetMenuItemByIdAsync(id, restaurant.Id);
            if (menuItem == null)
                return NotFound(ResponseHelper.CreateErrorResponse("Menu item not found."));

            await _menuItemRepo.DeleteMenuItemAsync(menuItem);
            await _menuItemRepo.SaveChangesAsync();

            return Ok(ResponseHelper.CreateSuccessResponse<string>(null, "Menu item deleted successfully"));
        }

        [HttpPost("photo/{id:int}")]
        public async Task<IActionResult> UploadMenuItemPhoto(int id, [FromForm] MenuItemPhotoUploadDto photoDto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized(ResponseHelper.CreateErrorResponse("Invalid user ID."));

            var restaurant = await _menuItemRepo.GetRestaurantByManagerIdAsync(userId.Value);
            if (restaurant == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("You do not have an approved restaurant."));

            var menuItem = await _menuItemRepo.GetMenuItemByIdAsync(id, restaurant.Id);
            if (menuItem == null)
                return NotFound(ResponseHelper.CreateErrorResponse("Menu item not found."));

            if (photoDto.Photo == null || photoDto.Photo.Length == 0)
                return BadRequest(ResponseHelper.CreateErrorResponse("No photo file provided."));

            string wwwrootPath = _webHostEnvironment.WebRootPath;
            string fileName = $"{Guid.NewGuid()}_{photoDto.Photo.FileName}";
            string filePath = Path.Combine(wwwrootPath, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await photoDto.Photo.CopyToAsync(fileStream);
            }

            menuItem.ImageUrl = fileName;
            await _menuItemRepo.UpdateMenuItemAsync(menuItem);
            await _menuItemRepo.SaveChangesAsync();

            return Ok(ResponseHelper.CreateSuccessResponse(new { imageUrl = fileName }, "Menu item photo uploaded successfully"));
        }
    }
}
