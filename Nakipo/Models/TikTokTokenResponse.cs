using System.Text.Json.Serialization;

namespace Nakipo.Services;

public class TikTokTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }
    
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
    
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; }
    
    [JsonPropertyName("open_id")]
    public string OpenId { get; set; }
}