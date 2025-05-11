using Nakipo.Models;

namespace Nakipo.Services;

public interface IAuthService
{
    Task<User> Login(string username, string password);
    
    Task<User> Register(User user);
    Task<User> GetUser(string userId);
    Task<User?> Update(User user);
}