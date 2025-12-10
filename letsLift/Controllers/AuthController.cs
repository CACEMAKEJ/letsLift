using LetsLift.Models;
using Microsoft.AspNetCore.Mvc;

namespace LetsLift.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserRepository _users;
    private readonly JwtService _jwt;

    public AuthController(UserRepository users, JwtService jwt)
    {
        _users = users;
        _jwt = jwt;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto dto)
    {
        var existing = await _users.GetByEmail(dto.Email);
        if (existing != null) return BadRequest("Email already in use");

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };

        await _users.Create(user);

        return Ok("Account created");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto dto)
    {
        var user = await _users.GetByEmail(dto.Email);
        if (user == null) return Unauthorized("Invalid credentials");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = _jwt.GenerateToken(user.Id, user.Email, user.Role);

        return Ok(new { token });
    }
}