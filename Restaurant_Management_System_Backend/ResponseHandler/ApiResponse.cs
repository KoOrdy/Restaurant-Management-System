namespace resturantApi.ResponseHandler
{
    public class ApiResponse<T>
    {
        public string? Message { get; set; }
        public T? Data { get; set; }
        public List<string>? Errors { get; set; }
    }
}
