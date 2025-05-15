using resturantApi.Models;
using resturantApi.Dtos.Chat;

namespace resturantApi.Interfaces
{
    public interface IChatRepository
    {
        Task<List<MessageDto>> GetChatHistoryAsync(int senderId, int receiverId);
        Task<MessageDto> SendMessageAsync(SendMessageDto messageDto, int SenderId);
        // Task<(bool, string? ErrorMessage)> MarkMessageAsReadAsync(int messageId, int currentUserId);
    }
}