using Nakipo.Models;

namespace Nakipo.Services;

public interface IImageService
{
    Task<User> InsertUserReport(IFormFile photo, Location location, string userId);
    Task<bool> HasUserUploadedToday(string userId);
}