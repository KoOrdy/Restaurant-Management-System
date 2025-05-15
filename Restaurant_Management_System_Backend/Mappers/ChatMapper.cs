using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using resturantApi.Dtos.Chat;
using resturantApi.Models;
namespace resturantApi.Mappers
{
    public static class ChatMapper
    {
        public static List<MessageDto> FromMessagesToDto(List<Messages> messages)
        {
            return messages.Select(m => FromMessageToDto(m)).ToList();
        }

        public static MessageDto FromMessageToDto(Messages message)
        {
            return new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId ?? 0,
                ReceiverId = message.ReceiverId ?? 0,
                Content = message.Content,
                Timestamp = message.Timestamp
            };
        }

        public static Messages FromDtoToMessages(SendMessageDto dto, int senderId)
        {
            return new Messages
            {
                SenderId = senderId,
                ReceiverId = dto.ReceiverId,
                Content = dto.Content,
                Timestamp = DateTime.UtcNow,
                IsRead = false
            };
        }
    }
}