using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Restaurant
{
    public class CategoryWithMenuDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MenuItemDto> MenuItems { get; set; }
    }
}