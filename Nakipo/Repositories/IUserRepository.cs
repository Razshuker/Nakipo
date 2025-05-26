using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IUserRepository
{
    Task<User?> GetUser(string userIdentify);
    Task<User?> InsertUser(User user);
    Task<bool> UpdateUserReports(string userId, int month, int year, int usedReportsForCupon);

    Task<int?> GetUserWalletByReports(string userIdentify, int month, int year);
    Task<List<User>?> GetTopUsersForMonth(int month, int year, string city);

    Task<User?> InsertReport(WalletReport report, string userId);

    Task<User?> UpdateUser(User user);

    Task<User?> UpdateUserPassword(string userId, string newPassword);
    Task SaveResetPasswordRequest(ResetPasswordRequest request);
    Task<ResetPasswordRequest?> GetResetPasswordRequest(string email, string token);
    Task MarkResetRequestAsUsed(string email, string token);
}