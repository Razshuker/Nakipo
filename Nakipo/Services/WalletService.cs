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

    public async Task<Cupon> GetCupon(string userId, int walletAmountToGetCupon)
    {
        try
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;
            var cupon = await walletRepository.GetCupon();
            if (cupon != null)
            { 
                walletRepository.CuponUsed(cupon.Id);
                userRepository.UpdateUserReports(userId,month, year, walletAmountToGetCupon);
                var walletNewValue = await userRepository.GetUserWalletByReports(userId, month, year);
                userRepository.UpdateUserWallet(userId, walletNewValue);
                return cupon;
            }

            return null;
        }
        catch (Exception e)
        {
           logger.LogError(e, "failed to get cupon code - walletService");
            throw;
        }
    }
}