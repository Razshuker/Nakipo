using Nakipo.Models;

namespace Nakipo.Services;

public interface IWalletService
{ 
    Task<int?> GetUserWalletByUserId(string userId);
    Task<User?> GetCupon(string userId, int walletAmountToGetCupon, int cuponExpiryMonths);
    
}
