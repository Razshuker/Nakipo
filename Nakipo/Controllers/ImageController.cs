using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Services;

namespace Nakipo.Controllers;
[ApiController]
[Authorize]
[Route("[controller]")]
public class ImageController(IImageService imageService, ILogger<ImageController> logger) : ControllerBase
{
[ApiExplorerSettings(IgnoreApi = true)] 
    [HttpPost("upload")]
    public async Task<ActionResult<User>> UploadPhoto([FromForm] IFormFile photo,
        [FromForm] double latitude,
        [FromForm] double longitude,
        [FromHeader(Name = "Userid")] string userId)
    {
        try
        {
        if (photo == null || photo.Length == 0)
        {
            return BadRequest("no photo uploaded");
        }

        var location = new Location
        {
            Latitude = latitude,
            Longitude = longitude
        };
        
        var updatedUser = await imageService.InsertUserReport(photo,location,userId);
       
        return Ok(updatedUser);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}

