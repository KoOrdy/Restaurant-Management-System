using Microsoft.EntityFrameworkCore;
using resturantApi.Models;
using resturantApi.Mappers;
using resturantApi.Dtos.Chat;
using resturantApi.Interfaces;
using resturantApi.Data;
using resturantApi.SMTP;

namespace resturantApi.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDBContext _context;
        public ChatRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<MessageDto>> GetChatHistoryAsync(int senderId, int receiverId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == senderId && m.ReceiverId == receiverId) ||
                            (m.SenderId == receiverId && m.ReceiverId == senderId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return ChatMapper.FromMessagesToDto(messages);
        }


        public async Task<MessageDto> SendMessageAsync(SendMessageDto messageDto, int SenderId)
        {
            var Message = ChatMapper.FromDtoToMessages(messageDto, SenderId);

            _context.Messages.Add(Message);
            await _context.SaveChangesAsync();

            return ChatMapper.FromMessageToDto(Message);
        }

        // public async Task<(bool, string? ErrorMessage)> MarkMessageAsReadAsync(int messageId, int currentUserId)
        // {
        //     var Message = await _context.Messages.FindAsync(messageId);
        //     if(Message == null)
        //     {
        //         return (false, "Message not found.");
        //     }
        //     if(Message.ReceiverId != currentUserId)
        //     {
        //         return (false, "You are not authorized to mark this message as read.");
        //     }

        //     Message.IsRead = true;
        //     await _context.SaveChangesAsync();
        //     return (true, null);
        // }

    }
}