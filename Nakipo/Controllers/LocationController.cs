using Microsoft.AspNetCore.Mvc;
using Nakipo.Services;

namespace Nakipo.Controllers;
[ApiController]
[Route("[controller]")]
public class LocationController(ILocationService locationService, ILogger<LocationController> logger):ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCityLocation(double latitude, double longitude)
    {
        try
        {
            var city = await locationService.GetCityNameAsync(latitude, longitude);
            return Ok(new { city });
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            return BadRequest(e.Message);
        }
    }
}