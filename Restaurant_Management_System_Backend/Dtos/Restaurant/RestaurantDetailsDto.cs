using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using resturantApi.Models;

namespace resturantApi.Dtos.Restaurant
{
    public class RestaurantDetailsDto
    {
        public List<CategoryWithMenuDto> Categories { get; set; }
    }
}