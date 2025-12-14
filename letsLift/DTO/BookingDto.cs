public class BookingDto
{
    public string Id { get; set; }
    public DateTime StartTime { get; set; }
    public string Description { get; set; }
    public string? BookedByUserName { get; set; }
}