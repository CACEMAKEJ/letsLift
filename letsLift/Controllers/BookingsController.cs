using Microsoft.AspNetCore.Mvc;

namespace LetsLift.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        var bookings = new[]
        {
            new { Id = 1, Description = "Session with Coach A" },
            new { Id = 2, Description = "Session with Coach B" }
        };

        return Ok(bookings);
    }
}