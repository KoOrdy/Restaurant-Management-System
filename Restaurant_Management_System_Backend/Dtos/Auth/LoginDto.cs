using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace resturantApi.Dtos.Auth
{
    public class LoginDto
    {
        [Required]
        public string password { get; set; }= string.Empty;
        [Required]
        public string Email { get; set; }= string.Empty;
    }
}