using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.Extensions.Options;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Services;

public class TikTokService(
    HttpClient httpClient,
    IConfiguration configuration,
    IAuthService authService,
    IHttpClientFactory httpClientFactory,
    ILogger<TikTokService> logger):ITiktokService
{
    public async Task<User?> LoginOrRegisterWithTikTok(string accessToken, string openId)
    {
        try
        {
            var userInfo = await GetUserInfo(accessToken, openId);
            var user = await authService.GetUser(userInfo.OpenId);
            if (user == null)
            {
                logger.LogInformation("tiktok register start");
                user = new User
                {
                    Username = userInfo.Username ?? $"tiktok_{userInfo.OpenId}",
                    FullName = userInfo.DisplayName,
                    Image = userInfo.AvatarUrl,
                    Provider = "TikTok",
                    TiktokOpenId = userInfo.OpenId,
                };
                return await authService.Register(user);
            }
            
            return user;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to process TikTok login");
            return null;
        }
    }
    
    private async Task<TikTokUserInfo> GetUserInfo(string accessToken, string openId)
    {
        var url = "https://open.tiktokapis.com/v2/user/info/";
        var client = httpClientFactory.CreateClient();
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        request.Content = new StringContent(
            JsonSerializer.Serialize(new { fields = new[] { "open_id", "union_id", "avatar_url", "display_name" } }),
            Encoding.UTF8,
            "application/json"
        );

        var response = await client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"TikTok user info request failed: {content}");

        var result = JsonSerializer.Deserialize<TikTokUserInfo>(content);
        return result;
    }

}