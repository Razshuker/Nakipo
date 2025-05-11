using MongoDB.Driver;
using Nakipo.Configurations;
using Nakipo.Models;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class WalletService(IWalletRepository walletRepository,IUserRepository userRepository, ILogger<WalletService> logger, MongoDbContext mongoContext):IWalletService
{
    public async Task<int?> GetUserWalletByUserId(string userId)
    {
        try
        {
            var date = DateTime.Now;
            var month = date.Month;
            var year = date.Year;
            return await userRepository.GetUserWalletByReports(userId, month, year);
        }
        catch (Exception e)
        {
           logger.LogError(e, "failed to get user wallet by userId");
           throw;
        }
    }

    public async Task<User?> GetCupon(string userId, int walletAmountToGetCupon)
    {
        try
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;
            var cupon = await walletRepository.GetCupon();
            if (cupon != null)
            { 
                walletRepository.CuponUsed(cupon.Id);
                if (await userRepository.UpdateUserReports(userId, month, year, walletAmountToGetCupon))
                {
                var user = await userRepository.GetUser(userId);
             user.Cupons.Add(cupon);
            return await userRepository.UpdateUser(user);
                }
            }

            return null;
        }
        catch (Exception e)
        {
           logger.LogError(e, "failed to get cupon code - walletService");
            return null;
        }
    }
}