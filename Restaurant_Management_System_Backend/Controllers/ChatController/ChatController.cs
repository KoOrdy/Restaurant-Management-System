using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization; 
using resturantApi.Interfaces; 
using System.Linq; 
using resturantApi.Models;
using resturantApi.Dtos.Chat;
using System.Threading.Tasks; 
using resturantApi.ResponseHandler; 

namespace resturantApi.Controllers
{
    [ApiController]
    [Route("api/chat")]
    [Authorize(Roles = "Customer,Manager")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;
        public ChatController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        [HttpGet("history/{userId:int}")]
        public async Task<IActionResult> GetChatHistory(int userId)
        {
            var currentUserIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(currentUserIdClaim))
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: ID not found in token.");
                return Unauthorized(errorResponse);
            }
            var currentUserId = int.Parse(currentUserIdClaim);

            try
            {
                var messages = await _chatRepository.GetChatHistoryAsync(currentUserId, userId);
                if (messages == null || !messages.Any())
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("No chat history found.");
                    return NotFound(errorResponse);
                }
                var successResponse = ResponseHelper.CreateSuccessResponse(new { Messages = messages }, "Chat history retrieved successfully.");
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto sendMessageDto)
        {
            if(!ModelState.IsValid)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Invalid message data.");
                return BadRequest(errorResponse);
            }

            var senderIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(senderIdClaim))
            {
                var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: ID not found in token.");
                return Unauthorized(errorResponse);
            }
            var senderUserId = int.Parse(senderIdClaim);
            try
            {
                var message = await _chatRepository.SendMessageAsync(sendMessageDto, senderUserId);
                if(message == null)
                {
                    var errorResponse = ResponseHelper.CreateErrorResponse("Failed to send message.");
                    return BadRequest(errorResponse);
                }

                var successResponse = ResponseHelper.CreateSuccessResponse(new { Message = message }, "Message sent successfully.");
                return Ok(successResponse);
            }
            catch(Exception ex)
            {
                var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
                return StatusCode(500, errorResponse);
            }
        }

        // [HttpPut("mark-as-read/{messageId:int}")]
        // public async Task<IActionResult> MarkMessageAsRead(int messageId)
        // {
        //     var currentUserIdClaim = User.FindFirst("id")?.Value;
        //     if (string.IsNullOrEmpty(currentUserIdClaim))
        //     {
        //         var errorResponse = ResponseHelper.CreateErrorResponse("Unauthorized: ID not found in token.");
        //         return Unauthorized(errorResponse);
        //     }
        //     var currentUserId = int.Parse(currentUserIdClaim);

        //     try
        //     {
        //         var (isMarked, errorMessage) = await _chatRepository.MarkMessageAsReadAsync(messageId, currentUserId);
        //         if (!string.IsNullOrEmpty(errorMessage) || !isMarked)
        //         {
        //             var errorResponse = ResponseHelper.CreateErrorResponse(errorMessage);
        //             return BadRequest(errorResponse); 
        //         }

        //         var successResponse = ResponseHelper.CreateSuccessResponse(new { MessageId = messageId }, "Message marked as read successfully.");
        //         return Ok(successResponse);
        //     }
        //     catch (Exception ex)
        //     {
        //         var errorResponse = ResponseHelper.CreateErrorResponse(ex.Message);
        //         return StatusCode(500, errorResponse);
        //     }
        // }
    }
}