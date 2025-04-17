
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
    
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] User user)
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
}