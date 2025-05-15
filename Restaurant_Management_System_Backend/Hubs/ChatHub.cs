using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using resturantApi.Interfaces;
using resturantApi.Models;
using resturantApi.Dtos.Chat;
using System;

namespace RestaurantApi.Hubs
{
public class ChatHub : Hub
{
    private readonly IChatRepository _chatRepository;

    public ChatHub(IChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    public async Task JoinChat(int userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"chat_{userId}");
    }

    public async Task SendMessage(int receiverId, string content)
    {
        try
        {
            var userId = int.Parse(Context.User.FindFirst("id")?.Value); 
            var messageDto = new SendMessageDto
            {
                ReceiverId = receiverId,
                Content = content
            };

            var savedMessageDto = await _chatRepository.SendMessageAsync(messageDto, userId);

            await Clients.Group($"chat_{receiverId}").SendAsync("ReceiveMessage", new
            {
                senderId = userId,
                content = savedMessageDto.Content,
                timestamp = savedMessageDto.Timestamp
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("SendMessage Error: " + ex.Message); // Add this
            await Clients.Caller.SendAsync("Error", new { message = ex.Message });
            throw;
        }

    }
}

}
