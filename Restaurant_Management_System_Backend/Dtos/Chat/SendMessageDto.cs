using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Models;

namespace resturantApi.Dtos.Chat
{
    public class SendMessageDto
    {
        [Required]
        public int ReceiverId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}