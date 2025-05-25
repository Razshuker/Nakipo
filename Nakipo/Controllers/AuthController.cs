
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Services;
using Nakipo.Utillties;

namespace Nakipo.Controllers;
[ApiController]
[Route("[controller]")]
public class AuthController(ILogger<AuthController> logger, IAuthService authService):ControllerBase
{
    
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login([FromBody] LoginUser user)
    {
        try
        {
            var registerUser = await authService.Login(user.Username, user.Password);
            if (registerUser != null)
            {
                var jwtToken = registerUser.GenerateJwtToken();
                Response.SetAccessToken(jwtToken);
                Response.SetTokenCookie(jwtToken);
                return Ok(registerUser);
            }
            return Unauthorized();
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to login - authController");
            return BadRequest(e);
        }
    }
    
    [ApiExplorerSettings(IgnoreApi = true)] 
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromForm] User user)
    {
        var registerUser = await authService.Register(user);

        if (registerUser == null)
        {
            return Conflict("User already exists");
        }
        var jwtToken = registerUser.GenerateJwtToken();
        Response.SetAccessToken(jwtToken);
        Response.SetTokenCookie(jwtToken);
        return Ok(registerUser);
    }
    
    [HttpPost("logout")]
    public ActionResult Logout()
    {
        Response.RemoveAccessToken();
        Response.RemoveTokenCookie();
        return Unauthorized();
    }
    
    [Authorize]
    [HttpGet("getUser")]
    public async Task<ActionResult<User>> GetUser([FromHeader(Name = "userId")]string userId)
    {
        try
        {
            if(string.IsNullOrEmpty(userId)) return Unauthorized();
            var user = await authService.GetUser(userId);
            if(user!= null) user.Password = null;
            return user;
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return BadRequest(e);
        }
    }

    [Authorize]
    [ApiExplorerSettings(IgnoreApi = true)] 
    [HttpPost("updateUser")]
    public async Task<ActionResult<User?>> UpdateUser([FromForm] User user,[FromForm] string? Cupons)
    {
        try
        {
            if (user == null) return BadRequest();
            if (!string.IsNullOrWhiteSpace(Cupons))
            {
                user.Cupons = JsonSerializer.Deserialize<List<Cupon>>(Cupons);

            }
            var updatedUser = await authService.Update(user);
            if (updatedUser == null) return BadRequest();
            updatedUser.Password = null;
            return Ok(updatedUser);
        }
        catch (Exception e)
        {
           logger.LogError(e,"Failed to update user");
            return null;
        }
    }

    [Authorize]
    [HttpPost("updateUserPassword")]
    public async Task<ActionResult<User?>> UpdateUserPassword([FromHeader(Name = "userId")] string userId, UpdatePassword passwords)
    {
        try
        {
         var user = await authService.UpdatePassword(userId, passwords);
         if (user != null)
         {
             var jwtToken = user.GenerateJwtToken();
             Response.SetAccessToken(jwtToken);
             Response.SetTokenCookie(jwtToken);
             return Ok(user);
         }

         return null;
        }
        catch (Exception e)
        {
           logger.LogError(e.Message);
            return null;
        }
    }
    
    [HttpPost("google")]
    public async Task<ActionResult<User>> GoogleLogin([FromBody] GoogleLoginDto dto)
    {
        try
        {
            var user = await authService.LoginOrRegisterWithGoogle(dto);
            var jwtToken = user.GenerateJwtToken();
            Response.SetAccessToken(jwtToken);
            Response.SetTokenCookie(jwtToken);
            return Ok(user);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to login - google");
            throw;
        }
    }

    [HttpPost("forgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        try
        {
            await authService.RequestPasswordResetAsync(request.Email);
            return Ok(new { message = "If an account exists with this email, a password reset link has been sent." });
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to process forgot password request");
            // Don't reveal if the email exists or not
            return Ok(new { message = "If an account exists with this email, a password reset link has been sent." });
        }
    }

    [HttpPost("validateResetToken")]
    public async Task<IActionResult> ValidateResetToken([FromBody] ValidateResetTokenRequest request)
    {
        try
        {
            var isValid = await authService.ValidateResetTokenAsync(request.Email, request.Token);
            return Ok(new { isValid });
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to validate reset token");
            return BadRequest(new { message = "Invalid or expired reset token." });
        }
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel request)
    {
        try
        {
            var success = await authService.ResetPasswordAsync(request.Email, request.Token, request.NewPassword);
            if (success)
            {
                return Ok(new { message = "Password has been reset successfully." });
            }
            return BadRequest(new { message = "Failed to reset password. Token may be invalid or expired." });
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to reset password");
            return BadRequest(new { message = "Failed to reset password." });
        }
    }
}