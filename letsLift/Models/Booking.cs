public class Booking
{
    public string Id { get; set; }
    public string CoachId { get; set; }
    public string CoachName { get; set; }

    public DateTime StartTime { get; set; }
    public string Description { get; set; }

    public string? BookedByUserId { get; set; }
    public string? BookedByUserName { get; set; }
}