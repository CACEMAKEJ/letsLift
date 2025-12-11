using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Blazored.LocalStorage;

public class AuthState {
    private readonly ILocalStorageService _localStorage;

    public AuthState(ILocalStorageService localStorage) {
        _localStorage = localStorage;
    }

    public string Token { get; private set; }
    public string Role { get; private set; }

    public bool IsLoggedIn => !string.IsNullOrEmpty(Token);

    public async Task LoadAsync() {
        Token = await _localStorage.GetItemAsStringAsync("jwt");
        ParseToken();
    }

    public async Task SetTokenAsync(string token) {
        Token = token;
        await _localStorage.SetItemAsStringAsync("jwt", token);
        ParseToken();
    }

    public async Task LogoutAsync() {
        Token = null;
        Role = null;
        await _localStorage.RemoveItemAsync("jwt");
    }

    private void ParseToken() {
        if (string.IsNullOrEmpty(Token))
            return;

        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(Token);

        Role = jwt.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
    }
}