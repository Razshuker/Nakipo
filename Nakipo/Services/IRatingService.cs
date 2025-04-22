using Nakipo.Models;

namespace Nakipo.Services;

public interface IRatingService
{
    Task<List<User>> GetRating();
    Task<List<User>> GetRatingByMonth(int month, int year);
}