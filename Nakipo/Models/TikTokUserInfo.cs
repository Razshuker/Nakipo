using System.Text.Json.Serialization;

namespace Nakipo.Services;

public class TikTokUserInfo
{
    [JsonPropertyName("open_id")]
    public string OpenId { get; set; }
    
    [JsonPropertyName("union_id")]
    public string UnionId { get; set; }
    
    [JsonPropertyName("username")]
    public string Username { get; set; }
    
    [JsonPropertyName("display_name")]
    public string DisplayName { get; set; }
    
    [JsonPropertyName("avatar_url")]
    public string AvatarUrl { get; set; }
}