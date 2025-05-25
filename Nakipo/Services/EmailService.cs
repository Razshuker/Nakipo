using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using MailKit.Security;
using MimeKit;
using Nakipo.Configurations;
using Nakipo.Repositories;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;


namespace Nakipo.Services;

public class EmailService(ILogger<EmailService> logger, IBrandRepository brandRepository) : IEmailService
{
    private readonly string _domain = "https://wedogood.co.il/";
    private readonly string _imgSrc = "https://wedogood.co.il/files/Share_image.jpg";
  private async Task<SmtpClient> GetAuthenticatedClientAsync()
    {
        var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets()
            {
                ClientId = ApplicationConfiguration.GoogleSettings.GoogleClientId,
                ClientSecret = ApplicationConfiguration.GoogleSettings.GoogleClientSecret
            }
        });

        var token = new TokenResponse() { RefreshToken = ApplicationConfiguration.EmailSettings.RefreshToken };
        var credential = new UserCredential(flow, "user", token);
        await credential.RefreshTokenAsync(CancellationToken.None);

        var client = new SmtpClient();
        await client.ConnectAsync(ApplicationConfiguration.EmailSettings.SmtpHost, int.Parse(ApplicationConfiguration.EmailSettings.SmtpPort), SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(new SaslMechanismOAuth2(ApplicationConfiguration.EmailSettings.SmtpUsername, credential.Token.AccessToken));
        return client;
    }

    public async Task SendPasswordResetEmailAsync(string email, string resetToken)
    {
        try
        {
            var resetLink = $"{_domain}reset-password?token={resetToken}&email={Uri.EscapeDataString(email)}";
            var expirationTime = DateTime.Now.AddHours(1).ToString("HH:mm");

            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(ApplicationConfiguration.EmailSettings.SmtpUsername));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "איפוס סיסמה - Dogood";
            message.Body = new TextPart("html")
            {
                Text = $@"
                <div dir='rtl' style='text-align: center; max-width: 600px; margin: 0 auto; padding: 20px;'>
                    <img src='{_imgSrc}' alt='תמונה לשיתוף' height='150' width='auto' />
                    <h2 style='color: #25115d;'>איפוס סיסמה</h2>
                    <p style='text-align: right;'>שלום,</p>
                    <p style='text-align: right;'>קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
                    <p style='text-align: right;'>לחץ על הכפתור למטה כדי לאפס את הסיסמה:</p>
                    <div style='margin: 30px 0;'>
                        <a href='{resetLink}' style='background-color: #25115d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;'>איפוס סיסמה</a>
                    </div>
                    <p style='text-align: right; color: #ff0000;'>⚠️ שים לב: קישור זה יפוג בשעה {expirationTime}</p>
                    <p style='text-align: right;'>אם לא ביקשת איפוס, אנא התעלם מהודעה זו.</p>
                    <hr style='margin: 30px 0;'>
                    <p style='text-align: center; color: #666;'>DoGood - כי טוב לעשות טוב</p>
                </div>"
            };

            using var client = await GetAuthenticatedClientAsync();
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send password reset email to {Email}", email);
        }
    }

    public async Task SendCuponCodeEmail(string email, string code)
    {
        var brand = await brandRepository.GetBrandByName("peteat");
        try
        {
            var expirationTime = DateTime.Now.AddMonths(3).ToString("dd/MM/yyyy");

            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(ApplicationConfiguration.EmailSettings.SmtpUsername));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = $"קוד קופון למימוש {brand.Name}";
            message.Body = new TextPart("html")
            {
                Text = $@"
                <div dir='rtl' style='text-align: center; max-width: 600px; margin: 0 auto; padding: 20px;'>
                    <img src='{_imgSrc}' alt='תמונה לשיתוף' height='150' width='auto' />
                    <h2 style='color: #25115d;'>קופון למימוש {brand.Name}</h2>
                    <p style='text-align: right;'>שלום,</p>
                    <p style='text-align: right;'>קיבלת קופון ״{brand.Gift}״</p>
                    <p style='background-color:#bcf3ff; padding:8px 12px; border-radius: 4px; font-weight: bold; font-size: 18px; display: inline-block;'>{code}</p>
                    <p style='text-align: right; color: #ff0000;'> תוקף הקופון עד: {expirationTime}</p>
                    <hr style='margin: 30px 0;'>
                    <p style='text-align: center; color: #666;'>DoGood - כי טוב לעשות טוב</p>
                </div>"
            };

            using var client = await GetAuthenticatedClientAsync();
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to send cupon email to {Email}", email);
        }
    }
} 