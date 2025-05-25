namespace Nakipo.Services;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(string email, string resetToken);
    Task SendCuponCodeEmail(string email, string code);
} 