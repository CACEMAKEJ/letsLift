using System.Security.Claims;
using LetsLift.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly BookingRepository _repo;

    public BookingsController(BookingRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bookings = await _repo.GetAllAsync();
        return Ok(bookings.Select(ToDto));
    }

    [Authorize(Roles = "Coach")]
    [HttpGet("coach")]
    public async Task<IActionResult> GetCoachSessions()
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var bookings = await _repo.GetByCoachAsync(coachId);
        return Ok(bookings.Select(ToDto));
    }

    [Authorize(Roles = "Coach")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateBookingReqDto dto)
    {
        var booking = new Booking
        {
            CoachId = User.FindFirstValue(ClaimTypes.NameIdentifier),
            CoachName = User.Identity!.Name!,
            StartTime = dto.StartTime,
            Description = dto.Description
        };

        await _repo.AddAsync(booking);
        return Ok();
    }

    [Authorize(Roles = "User")]
    [HttpPost("{id}/claim")]
    public async Task<IActionResult> Claim(string id)
    {
        var success = await _repo.ClaimAsync(
            id,
            User.FindFirstValue(ClaimTypes.NameIdentifier),
            User.Identity!.Name!
        );

        return success ? Ok() : BadRequest("Already booked");
    }

    private static BookingDto ToDto(Booking b) => new()
    {
        Id = b.Id,
        StartTime = b.StartTime,
        Description = b.Description,
        BookedByUserName = b.BookedByUserName
    };
}