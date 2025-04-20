using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IUserRepository
{
    Task<User?> GetUser(string userIdentify);
    Task<User?> insertUser(User user);
    void UpdateUserWallet(string userId);
    
}