using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using LetsLift.Models;
using LetsLift.Data;
using Microsoft.AspNetCore.Authorization;

namespace LetsLift.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly BookingRepository _repo;

    public BookingsController(BookingRepository repo)
    {
        _repo = repo;
    }

    [HttpPost("create")]
    [AllowAnonymous] // <-- PUBLIC endpoint
    public async Task<IActionResult> CreateBooking(CreateBookingReqDto dto)
    {
        var booking = new Booking
        {
            CoachName = dto.CoachName,
            StartTime = dto.StartTime,
            Description = dto.Description,
            BookedByUserName = dto.ClientName
        };

        await _repo.CreateAsync(booking);
        return Ok(booking);
    }
}