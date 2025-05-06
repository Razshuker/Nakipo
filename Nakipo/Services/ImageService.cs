using Nakipo.Models;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class ImageService(ILogger<ImageService> logger, IWebHostEnvironment env, IUserRepository userRepository):IImageService
{
    public async Task<User> InsertUserReport(IFormFile photo, Location location, string userId)
    {
        try
        {
            var imagePath = Path.Combine(env.WebRootPath ?? "wwwroot", "images");


            if (!Directory.Exists(env.WebRootPath))
            {
                Directory.CreateDirectory(env.WebRootPath!);
            }


            if (!Directory.Exists(imagePath))
            {
                Directory.CreateDirectory(imagePath);
            }


            var fileName = $"photo_{DateTime.Now.Ticks}.jpg";
            var fullPath = Path.Combine(imagePath, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            var report = new WalletReport
            {
                Image = fileName,
                Location = location,
                Date = DateTime.Now,
                ExpirationDate = DateTime.Now.AddMonths(1),
                ReportUsed = false
            };

            return await userRepository.InsertReport(report, userId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}