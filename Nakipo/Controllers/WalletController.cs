using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Repositories;
using Nakipo.Services;

namespace Nakipo.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class WalletController(IWalletService walletService, ILogger<WalletController> logger) : ControllerBase
{
    [HttpGet("getWallet")]
    public async Task<ActionResult<int>>GetUserWallet([FromHeader(Name = "userId")]string userId)
    {
        try
        {
            if (userId == null) return Unauthorized();
            var wallet = await walletService.GetUserWalletByUserId(userId);
            if (wallet != null)
            {
                return Ok(wallet);
            }
            return Unauthorized("user not found");
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            throw;
        }
     
    }

    [HttpPost("getCuponCode")]
    public async Task<ActionResult<User?>> getCuponCode([FromHeader] string userId)
    {
        try
        {
            if (userId == null) return Unauthorized();
            var walletAmountToGetCupon = 50;
            var wallet = await walletService.GetUserWalletByUserId(userId);
            if (wallet != null)
            {
                if(wallet< walletAmountToGetCupon) return Content("No enough money");
                var user = await walletService.GetCupon(userId,walletAmountToGetCupon);
                if (user != null) return Ok(user);
                return NotFound("No cupon code");
            }
            return Unauthorized("user not found");
        }
        catch (Exception e)
        {
           logger.LogError(e, e.Message);
            return null;
        }
    }
   
    
}