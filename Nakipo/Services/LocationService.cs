using System.Net.Http.Headers;
using System.Text.Json;

namespace Nakipo.Services;

public class LocationService : ILocationService
{
    private readonly HttpClient _httpClient;

    public LocationService(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
        _httpClient.DefaultRequestHeaders.UserAgent.Add(
            new ProductInfoHeaderValue("dogood", "1.0")); // Required by Nominatim
    }

    public async Task<string> GetCityNameAsync(double lat, double lon)
    {
        if (lat == 0 || lon == 0)
            return "לא נרשם מיקום";

        var url = $"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json&accept-language=he";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content);

        var root = json.RootElement;

        var address = root.GetProperty("address");

        var city = address.TryGetProperty("city", out var cityElement)
            ? cityElement.GetString()
            : address.TryGetProperty("town", out var townElement)
                ? townElement.GetString()
                : address.TryGetProperty("village", out var villageElement)
                    ? villageElement.GetString()
                    : address.TryGetProperty("region", out var regionElement)
                        ? regionElement.GetString()
                    : "לא ידוע";
        return city ?? "מיקום לא ידוע";
    }

}