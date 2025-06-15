using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Nakipo.Configurations;
using Nakipo.Models;
using Nakipo.Services;

namespace Nakipo.Controllers;

[ApiController]
[Route("[controller]")]
public class TiktokController(
    IHttpClientFactory httpClientFactory, ITiktokService tiktokService) : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login()
    {
        var clientKey = ApplicationConfiguration.TiktokSettings.TiktokClientKey;
        var redirectUri = ApplicationConfiguration.TiktokSettings.TiktokRedirectUri;
        var state = Guid.NewGuid().ToString(); // You may store this in session/cookie

        var url = $"https://www.tiktok.com/v2/auth/authorize/?" +
                  $"client_key={clientKey}" +
                  $"&response_type=code" +
                $"&scope=user.info.basic" +
                  $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                  $"&state={state}";

        return Redirect(url);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> Callback([FromQuery] string code, [FromQuery] string state)
    {
        var client = httpClientFactory.CreateClient();
        var tokenUrl = "https://open.tiktokapis.com/v2/oauth/token/";

        var parameters = new Dictionary<string, string>
        {
            { "client_key", ApplicationConfiguration.TiktokSettings.TiktokClientKey },
            { "client_secret", ApplicationConfiguration.TiktokSettings.TiktokClientSecret },
            { "code", code },
            { "grant_type", "authorization_code" },
            { "redirect_uri", ApplicationConfiguration.TiktokSettings.TiktokRedirectUri }
        };

        var response = await client.PostAsync(tokenUrl, new FormUrlEncodedContent(parameters));
        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            return BadRequest(content);

        var tokenResponse = JsonSerializer.Deserialize<TikTokTokenResponse>(content);

        var user = await tiktokService.LoginOrRegisterWithTikTok(tokenResponse.AccessToken, tokenResponse.OpenId);

        // You can now use open_id and access_token to fetch user info or create a session
        return Ok(new
        {
            token = tokenResponse.AccessToken,
            openId = tokenResponse.OpenId
        });
    }
}