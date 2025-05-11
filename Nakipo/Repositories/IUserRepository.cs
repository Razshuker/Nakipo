using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IUserRepository
{
    Task<User?> GetUser(string userIdentify);
    Task<User?> InsertUser(User user);
    Task<bool> UpdateUserReports(string userId, int month, int year, int usedReportsForCupon);

    // void UpdateUserWallet(string userId, int? newWalletValue);

    Task<int?> GetUserWalletByReports(string userIdentify, int month, int year);
    Task<List<User>> GetTopUsersForMonth(int month, int year);

    Task<User> InsertReport(WalletReport report, string userId);
    
    Task<User?> UpdateUser(User user);
}