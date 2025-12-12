namespace LetsLift.Models;

public class CreateBookingReqDto
{
    public string CoachName { get; set; }
    public string ClientName { get; set; }
    public DateTime StartTime { get; set; }
    public string Description { get; set; }
}