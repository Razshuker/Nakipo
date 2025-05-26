using Nakipo.Models;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class RatingService(ILogger<RatingService> logger, IUserRepository userRepository) : IRatingService
{
    public async Task<List<User>?> GetRating(string city)
    {
        try
        {
            var date = DateTime.Now;
            var month = date.Month;
            var year = date.Year;
            var topUsers = await userRepository.GetTopUsersForMonth(month, year, city);
            return topUsers;
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return null;
        }
    }


    public async Task<List<User>?> GetRatingByMonth(int month, int year, string city)
    {
        try
        {
            var topUsers = await userRepository.GetTopUsersForMonth(month, year, city);
            return topUsers?.ToList();
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return null;
        }
    }
}