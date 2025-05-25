using Nakipo.Models;

namespace Nakipo.Services;

public interface IAuthService
{
    Task<User?> Login(string username, string password);
    
    Task<User> Register(User user);
    Task<User> GetUser(string userId);
    Task<User?> Update(User user);
    
    Task<User?> UpdatePassword(string userId, UpdatePassword passwords);
    Task<User> LoginOrRegisterWithGoogle(GoogleLoginDto dto);
    Task<string> RequestPasswordResetAsync(string email);
    Task<bool> ValidateResetTokenAsync(string email, string token);
    Task<bool> ResetPasswordAsync(string email, string token, string newPassword);
}