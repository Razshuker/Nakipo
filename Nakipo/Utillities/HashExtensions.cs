using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Utillties;

public static class HashExtensions
{
    public static string ComputeMD5Hash(this string input)
    {
        using MD5 md5 = MD5.Create();
        var inputBytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = md5.ComputeHash(inputBytes);
        var sb = new StringBuilder();
        foreach (var t in hashBytes)
        {
            sb.Append(t.ToString("x2"));
        }
        return sb.ToString();
    }
    
     public static string GenerateJwtToken(this User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(ApplicationConfiguration.HashToken);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.UserData, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
     
    public static string ReGenerateJwtToken(this JwtSecurityToken token)
    {
        var handler = new JwtSecurityTokenHandler();
        var hashToken = ApplicationConfiguration.HashToken;
        var key = Encoding.UTF8.GetBytes(hashToken);

        var claims = token.Claims;

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1), 
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var newToken = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(newToken);
    }
    public static void SetAccessToken(this HttpResponse response, string token)
    {
        response.Headers["Authorization"] = $"Bearer {token}";
    }

    public static void SetTokenCookie(this HttpResponse response, string token)
    {
        var cookieOptions = new CookieOptions
        {
            // HttpOnly = true, 
            Secure = true, 
            SameSite = SameSiteMode.None, // Prevents cross-site requests from sending the cookie
            Expires = DateTime.UtcNow.AddDays(1) // Expiry date for the cookie
        };

        response.Cookies.Append("accessToken", token , cookieOptions);
    }

    public static void RemoveTokenCookie(this HttpResponse response)
    {
        response.Cookies.Delete("accessToken");
    }

    public static void RemoveAccessToken(this HttpResponse response)
    {
        response.Headers["Authorization"] = "";
    }

    public static User DecodeJwtToken(this string bearerToken)
    {
        var token = bearerToken.Split(" ").Last();
        var dToken = new JwtSecurityToken(jwtEncodedString: token);
        var username = dToken.Claims.First(c => c.Type == "username").Value;
        var id = dToken.Claims.First(c => c.Type == "nameid").Value;
        return new User
        {
            Id = int.Parse(id).ToString(),
            Username = username,
        };
    }
    
}