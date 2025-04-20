using Nakipo.Models;

namespace Nakipo.Services;

public interface IWalletService
{ 
    Task<int?> GetUserWalletByUserId(string userId);
    Task<Cupon> GetCupon(string userId);
    
}
