using System.Text.Json;

namespace Nakipo.Services;

public interface ILocationService
{
    Task<string> GetCityNameAsync(double lat, double lon);
}