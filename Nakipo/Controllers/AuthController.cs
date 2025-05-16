
using System.Text.Json;
using Google.Apis.Auth;
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
            return Unauthorized();
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
            throw;
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
}