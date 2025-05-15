using System.ComponentModel.DataAnnotations;

namespace resturantApi.Dtos.Table
{
    public class TableRequestDto
    {
        [Required]
        public int Capacity { get; set; }

        
        [Required]
        public string TableName { get; set; }
    }
}