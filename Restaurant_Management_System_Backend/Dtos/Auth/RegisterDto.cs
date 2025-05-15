using System.ComponentModel.DataAnnotations;

namespace resturantApi.Dtos.Auth
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }= string.Empty;
        [Required]
        [RegularExpression(@"^.*@.*$", ErrorMessage = "Email must contain @")]
        public string Email { get; set; } = string.Empty;
        [Required]
        [StringLength(100,MinimumLength =6,ErrorMessage ="Password at least 6 characters")]
        public string Password {get;set;}=string.Empty;
    }
}