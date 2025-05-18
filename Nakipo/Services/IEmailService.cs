using Nakipo.Models;

namespace Nakipo.Services;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(string email, string resetToken);
} 