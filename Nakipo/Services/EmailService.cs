using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Services;

public class EmailService(ILogger<EmailService> logger) : IEmailService
{
    public async Task SendPasswordResetEmailAsync(string email, string resetToken)
    {
        try
        {
            var resetLink = $"http://localhost:3000/reset-password?token={resetToken}&email={WebUtility.UrlEncode(email)}";
            var expirationTime = DateTime.UtcNow.AddHours(1).ToString("HH:mm");
            
            var message = new MailMessage
            {
                From = new MailAddress(ApplicationConfiguration.EmailSettings.FromEmail),
                Subject = "איפוס סיסמה - DoGood",
                Body = $@"
                    <div dir='rtl' style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <h2 style='color: #25115d; text-align: center;'>איפוס סיסמה</h2>
                        <p style='text-align: right;'>שלום,</p>
                        <p style='text-align: right;'>קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
                        <p style='text-align: right;'>לחץ על הכפתור למטה כדי לאפס את הסיסמה:</p>
                        <div style='text-align: center; margin: 30px 0;'>
                            <a href='{resetLink}' style='background-color: #25115d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;'>איפוס סיסמה</a>
                        </div>
                        <p style='text-align: right; color: #ff0000;'>⚠️ שים לב: קישור זה יפוג בעוד שעה (בשעה {expirationTime})</p>
                        <p style='text-align: right;'>אם לא ביקשת לאפס את הסיסמה, אנא התעלם מהודעה זו.</p>
                        <hr style='margin: 30px 0;'>
                        <p style='text-align: center; color: #666;'>DoGood - כי טוב לעשות טוב</p>
                    </div>",
                IsBodyHtml = true
            };
            
            message.To.Add(email);

            using var client = new SmtpClient(ApplicationConfiguration.EmailSettings.SmtpHost, int.Parse(ApplicationConfiguration.EmailSettings.SmtpPort))
            {
                Credentials = new NetworkCredential(ApplicationConfiguration.EmailSettings.SmtpUsername, ApplicationConfiguration.EmailSettings.SmtpPassword),
                EnableSsl = true
            };

            await client.SendMailAsync(message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send password reset email to {Email}", email);
            return;
        }
    }
} 