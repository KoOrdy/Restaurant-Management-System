using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;
using resturantApi.Dtos.Categorie;

namespace resturantApi.Dtos.Restaurant
{
    public class    MenuItemResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool Availability { get; set; }
    public int? CategoryId { get; set; }
    public string Category { get; set; }
    public string? ImageUrl { get; set; }
}
}