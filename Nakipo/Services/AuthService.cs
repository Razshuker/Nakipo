

using Nakipo.Models;
using Nakipo.Repositories;
using Nakipo.Utillties;

namespace Nakipo.Services;

public class AuthService(ILogger<AuthService> logger,IUserRepository userRepository): IAuthService
{
    public async Task<User> Login(string username, string password)
    {
        try
        {
            var userToVerify = await userRepository.GetUser(username);
            if (userToVerify == null || password.ComputeMD5Hash() != userToVerify.Password)
            {
                return null;
            }
            return userToVerify;
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Failed to login {username} - authService");
            throw;
        }
    }

    public async Task<User> Register(User user)
    {
        try
        {
            var userToRegister = await userRepository.GetUser(user.Username);
            if (userToRegister == null)
            {
                var hashedPassword = user.Password.ComputeMD5Hash();
                user.Password = hashedPassword;
                user.Wallet = 0;
                return await userRepository.InsertUser(user);
            }
            return null;
        }
        catch (Exception e)
        {
            logger.LogError(e,"Failed to register user - authService");
            throw;
        }
    }

    public async Task<User> GetUser(string userId)
    {
        try
        {
            return await userRepository.GetUser(userId);
        }
        catch (Exception e)
        {
           logger.LogError(e, $"Failed to get user with id {userId}");
            throw;
        }
    }
}