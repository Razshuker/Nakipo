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
            var userInfo = await userRepository.GetUser(userId);
            if (userInfo != null)
            {
                return userInfo.Wallet;
            }
            return null;
        }
        catch (Exception e)
        {
           logger.LogError(e, "failed to get user wallet by userId");
           throw;
        }
    }

    public async Task<Cupon> GetCupon(string userId)
    {
        try
        {
            var cupon = await walletRepository.GetCupon();
            if (cupon != null)
            { 
                walletRepository.CuponUsed(cupon.Id);
                userRepository.UpdateUserWallet(userId);
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