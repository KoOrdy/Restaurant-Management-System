using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using resturantApi.ResponseHandler;
using resturantApi.Interfaces;
using resturantApi.Dtos.Categorie;

namespace resturantApi.Controllers.AdminController
{
    [ApiController]
    [Route("api")]
    public class CategorieController : ControllerBase
    {
        private readonly ICategorieRepository _repository;

        public CategorieController(ICategorieRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _repository.GetAllCategoriesAsync();
            if (categories.Count == 0)
                return BadRequest(ResponseHelper.CreateErrorResponse("No categories found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { Categories = categories }, "Categories retrieved successfully"));
        }
        [HttpGet("admin/categories/all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCategoriesAdmin()
        {
            var categories = await _repository.GetAllCategoriesAsync();
            if (categories.Count == 0)
                return BadRequest(ResponseHelper.CreateErrorResponse("No categories found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { Categories = categories }, "Categories retrieved successfully"));
        }

        [HttpGet("admin/categories/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByIdCategories(int id)
        {
            var category = await _repository.GetCategorieByIdAsync(id);
            if (category == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("No category found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { Category = category }, "Category retrieved successfully"));
        }

        [HttpPost("admin/categories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategorie(RequestCategorieDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.CreateCategorieAsync(dto);
            if (created == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Category already exists"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { Category = created }, "Category created successfully"));
        }

        [HttpDelete("admin/categories/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteCategorie(int id)
        {
            var deleted = await _repository.DeleteCategorieAsync(id);
            if (!deleted)
                return NotFound(ResponseHelper.CreateErrorResponse("Category not found"));

            return Ok(ResponseHelper.CreateSuccessResponse<string>(default, "Category deleted successfully"));
        }

        [HttpPut("admin/categories/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategorie(int id, RequestCategorieDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _repository.UpdateCategorieAsync(id, dto);
            if (updated == null)
                return BadRequest(ResponseHelper.CreateErrorResponse("Another category with the same name exists or category not found"));

            return Ok(ResponseHelper.CreateSuccessResponse(new { Category = updated }, "Category updated successfully"));
        }
    }
}
