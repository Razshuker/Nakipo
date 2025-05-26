using Nakipo.Models;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class ImageService(
    ILogger<ImageService> logger,
    IWebHostEnvironment env,
    IUserRepository userRepository,
    ISpaceService spaceService,
    IWalletService walletService) : IImageService
{
    public async Task<User?> InsertUserReport(IFormFile photo, Location location, string userId)
    {
        try
        {
            var fileName = $"photo_{DateTime.Now.Ticks}.jpg";

            await spaceService.UploadFileAsync(photo, userId, fileName);

            var report = new WalletReport
            {
                Image = $"{userId}/{fileName}",
                Location = location,
                Date = DateTime.Now,
                ExpirationDate = DateTime.Now.AddMonths(1),
                ReportUsed = false
            };

            var user = await userRepository.InsertReport(report, userId);
            var walletAmountToGetCupon = 30;
            var cuponExpiryMonth = 3;
            var userWithCupon = await walletService.GetAutoCupon(userId, walletAmountToGetCupon, cuponExpiryMonth);
            return userWithCupon ?? user;
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            return null;
        }
    }

    public async Task<bool> HasUserUploadedToday(string userId)
    {
        try
        {
            var user = await userRepository.GetUser(userId);

            if (user?.Reports == null || user.Reports.Count == 0)
                return false;

            var today = DateTime.Now.Date;

            var hasReportToday = user.Reports.Any(r => r.Date.Date == today);

            return hasReportToday;
        }
        catch (Exception e)
        {
            logger.LogError(e, "failed to HasUserUploadedToday - image service");
            return false;
        }
    }
}