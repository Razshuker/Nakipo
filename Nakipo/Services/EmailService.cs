using System.Net;
using System.Net.Mail;
using Nakipo.Configurations;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class EmailService(ILogger<EmailService> logger, IBrandRepository brandRepository) : IEmailService
{
    private readonly string _domain = "https://wedogood.co.il/";
    private readonly string _imgSrc = "https://wedogood.co.il/files/Share_image.jpg";
    private readonly SmtpClient _client = new SmtpClient(
        ApplicationConfiguration.EmailSettings.SmtpHost,
        int.Parse(ApplicationConfiguration.EmailSettings.SmtpPort))
    {
        Credentials = new NetworkCredential(
            ApplicationConfiguration.EmailSettings.SmtpUsername,
            ApplicationConfiguration.EmailSettings.SmtpPassword),
        EnableSsl = true
    };

    public async Task SendPasswordResetEmailAsync(string email, string resetToken)
    {
        try
        {
            var resetLink = $"{_domain}reset-password?token={resetToken}&email={WebUtility.UrlEncode(email)}";
            var expirationTime = DateTime.UtcNow.AddHours(1).ToString("HH:mm");
            
            var message = new MailMessage
            {
                From = new MailAddress(ApplicationConfiguration.EmailSettings.FromEmail),
                Subject = "איפוס סיסמה - Dogood",
                Body = $@"
                    <div dir='rtl' style='text-align: center; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <img src='{_imgSrc}' alt='תמונה לשיתוף' height='150' width='auto' />
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
            
            await _client.SendMailAsync(message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send password reset email to {Email}", email);
            return;
        }
    }

    public async Task SendCuponCodeEmail(string email, string code)
    {
        var brand = await brandRepository.GetBrandByName("peteat");
        try
        {
            var expirationTime = DateTime.Now.AddMonths(3).ToString("dd/MM/yyyy");
            var message = new MailMessage
            {
                From = new MailAddress(ApplicationConfiguration.EmailSettings.FromEmail),
                Subject = $"קוד קופון למימוש {brand.Name}",
                Body = $@"
                    <div dir='rtl' style='text-align: center; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <img src='{_imgSrc}' alt='תמונה לשיתוף' height='150' width='auto' />
                        <h2 style='color: #25115d; text-align: center;'> קופון למימוש {brand.Name}</h2>
                        <p style='text-align: right;'>שלום,</p>
                        <p style='text-align: right;'>קיבלת קופון ״{brand.Gift}״</p>
<p style='display: inline-block; background-color:#bcf3ff; padding:8px 12px; border-radius: 4px; font-weight: bold; font-size: 18px;'>{{code}}</p>
                        <p style='text-align: right; color: #ff0000;'> שים לב תוקף הקופון עד לתאריך: {expirationTime}</p>
                        <hr style='margin: 30px 0;'>
                        <p style='text-align: center; color: #666;'>Dogood - כי טוב לעשות טוב</p>
                    </div>",
                IsBodyHtml = true
            };
            message.To.Add(email);
            await _client.SendMailAsync(message);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to send cupon email to {Email}", email);
            return;
        }
        
    }
} 