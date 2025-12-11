using System.Net.Http.Json;

public class AuthService
{
    private readonly IHttpClientFactory _factory;

    public AuthService(IHttpClientFactory factory)
    {
        _factory = factory;
    }

    public async Task<string?> Login(string email, string password)
    {
        var client = _factory.CreateClient("Api");

        var response = await client.PostAsJsonAsync("auth/login", new {
            Email = email,
            Password = password
        });

        if (!response.IsSuccessStatusCode)
            return null;

        var result = await response.Content.ReadFromJsonAsync<LoginResult>();
        return result.Token;
    }

    public async Task<bool> Register(string email, string password, string role)
    {
        var client = _factory.CreateClient("Api");

        var response = await client.PostAsJsonAsync("auth/register", new {
            Email = email,
            Password = password,
            Role = role
        });

        return response.IsSuccessStatusCode;
    }

    private class LoginResult
    {
        public string Token { get; set; }
    }
}