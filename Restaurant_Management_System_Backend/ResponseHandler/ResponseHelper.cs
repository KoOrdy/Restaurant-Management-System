using System.Collections.Generic; 

namespace resturantApi.ResponseHandler
{
    public class ResponseHelper
    {
        public static ApiResponse<T> CreateResponse<T>(string message, T data, List<string> errors = null)
        {
            return new ApiResponse<T>
            {
                Message = message ?? null,
                Data = data,  
                Errors = errors ?? new List<string>()
            };
        }

        public static ApiResponse<object> CreateErrorResponse(string errorMessage)
        {
            return CreateResponse<object>("", null, new List<string> { errorMessage });
        }

        public static ApiResponse<T> CreateSuccessResponse<T>(T data, string message = "Success")
        {
            return CreateResponse(message, data);
        }
    }
}
