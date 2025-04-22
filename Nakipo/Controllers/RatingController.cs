using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Services;

namespace Nakipo.Controllers;

public class RatingController(ILogger<RatingController> logger, IRatingService ratingService):ControllerBase
{
    [HttpGet("rating")]
    public async Task<ActionResult<List<User>>> GetRating()
    {
        try
        {
            var rating = await ratingService.GetRating();
            return Ok(rating);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            throw;
        }
    }
    
    [HttpGet("GetRatingByMonth")]
    public async Task<ActionResult<List<User>>> GetRatingByMonth(int month, int year)
    {
        try
        {
            var rating = await ratingService.GetRatingByMonth(month, year);
            return Ok(rating);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            throw;
        }
    }
    
}