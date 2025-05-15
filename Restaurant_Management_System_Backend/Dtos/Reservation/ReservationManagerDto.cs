using resturantApi.Dtos.Order;
namespace resturantApi.Dtos.Reservation
{
    public class ReservationManagerDto
    {
        public int Id { get; set; }
    public string CustomerName { get; set; }
    public DateTime ReservationDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int NumberOfGuests { get; set; }
    public string Status { get; set; }
    public int? TableId { get; set; }
    public string TableName { get; set; }
    public OrderDto? Order { get; set; }
    }
}   