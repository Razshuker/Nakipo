using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Services;

namespace Nakipo.Controllers;

public class RatingController(ILogger<RatingController> logger, IRatingService ratingService):ControllerBase
{
    [HttpGet("rating")]
    public async Task<ActionResult<List<User>>> GetRating(string city)
    {
        try
        {
            var rating = await ratingService.GetRating(city);
            return Ok(rating);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            throw;
        }
    }
    
    [HttpGet("GetRatingByMonth")]
    public async Task<ActionResult<List<User>>> GetRatingByMonth(int month, int year, string city)
    {
        try
        {
            var rating = await ratingService.GetRatingByMonth(month, year, city);
            return Ok(rating);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            throw;
        }
    }
    
}