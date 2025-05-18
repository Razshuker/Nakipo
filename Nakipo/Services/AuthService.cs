using Google.Apis.Auth;
using Nakipo.Models;
using Nakipo.Repositories;
using Nakipo.Utillties;

namespace Nakipo.Services;

public class AuthService(
    ILogger<AuthService> logger,
    IUserRepository userRepository, 
    ISpaceService spaceService,
    IEmailService emailService) : IAuthService
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
                var photoPath = $"profile.jpg";
                var hashedPassword = user.Password.ComputeMD5Hash();
                user.Password = hashedPassword;
                user.Wallet = 0;
                    var newUser = await userRepository.InsertUser(user);
                    if (user.ImageFile != null)
                    {
                    await spaceService.UploadFileAsync(user.ImageFile,newUser.Id, photoPath);
                    newUser.Image = $"{newUser.Id}/{photoPath}";
                    }
                   return await userRepository.UpdateUser(newUser);
                
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

    public async Task<User?> Update(User user)
    {
        try
        {
            if (user.ImageFile != null)
            {
                var photoPath = $"profile.jpg";
                await spaceService.UploadFileAsync(user.ImageFile,user.Id, photoPath);
                user.Image = $"{user.Id}/{photoPath}";
            }
          return await userRepository.UpdateUser(user);
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Failed to update user with id {user.Id}");
            return null;
        }
    }

    public async Task<User?> UpdatePassword(string userId, UpdatePassword passwords)
    {
        try
        {
            var user = await userRepository.GetUser(userId);
            if (user != null && user.Password == passwords.CurrentPassword.ComputeMD5Hash())
            {
            var hashedPassword = passwords.NewPassword.ComputeMD5Hash();
           var newPassword = hashedPassword;
               var updatedUser = await userRepository.UpdateUserPassword(userId, newPassword);
               return updatedUser;
            }
            return null;
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Failed to update password for user {userId}");
            return null;
        }
    }

    public async Task<User> LoginOrRegisterWithGoogle(GoogleLoginDto dto)
    {
        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(dto.Credential);
            var userEmail = payload.Email;
            var user = await userRepository.GetUser(userEmail);
            if (user == null)
            {
                var newUser = new User
                {
                    Email = userEmail,
                    FullName = payload.Name,
                    Username = userEmail.Split('@')[0],
                    Image = payload.Picture,
                    Provider = "Google"
                };
                    return await userRepository.InsertUser(newUser);
            }

            return user;

        }
        catch (Exception e)
        {
           logger.LogError(e,"Failed to login or create user - google");
           return null;
        }
    }

    public async Task<string> RequestPasswordResetAsync(string email)
    {
        try
        {
            var user = await userRepository.GetUser(email);
            if (user == null)
            {
                return null;
            }

            // Generate a random token
            var token = Guid.NewGuid().ToString("N");
            
            // Store the reset request
            var resetRequest = new ResetPasswordRequest
            {
                Email = email,
                Token = token,
                ExpiryDate = DateTime.UtcNow.AddHours(1),
                IsUsed = false
            };
            
            await userRepository.SaveResetPasswordRequest(resetRequest);
            
            // Send the reset email
            await emailService.SendPasswordResetEmailAsync(email, token);
            
            return token;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to request password reset for {Email}", email);
            return null;
        }
    }

    public async Task<bool> ValidateResetTokenAsync(string email, string token)
    {
        try
        {
            var request = await userRepository.GetResetPasswordRequest(email, token);
            return request != null && 
                   !request.IsUsed && 
                   request.ExpiryDate > DateTime.UtcNow;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to validate reset token for {Email}", email);
            return false;
        }
    }

    public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword)
    {
        try
        {
            if (!await ValidateResetTokenAsync(email, token))
            {
                return false;
            }

            var user = await userRepository.GetUser(email);
            if (user == null)
            {
                return false;
            }

            // Hash the new password
            var hashedPassword = newPassword.ComputeMD5Hash();
            
            // Update the password
            await userRepository.UpdateUserPassword(user.Id, hashedPassword);
            
            // Mark the reset request as used
            await userRepository.MarkResetRequestAsUsed(email, token);
            
            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to reset password for {Email}", email);
            return false;
        }
    }
}