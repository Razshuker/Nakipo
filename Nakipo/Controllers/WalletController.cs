using Microsoft.AspNetCore.Mvc;
using Nakipo.Repositories;
using Nakipo.Services;

namespace Nakipo.Controllers;

public class WalletController(IWalletService walletService, ILogger<WalletController> logger) : ControllerBase
{
    [HttpGet("getWallet")]
    public async Task<ActionResult<int>>GetUserWallet([FromQuery(Name = "userId")]string userId)
    {
        try
        {
            var wallet = await walletService.GetUserWalletByUserId(userId);
            if (wallet != null)
            {
                return Ok(wallet);
            }
            return NotFound("user not found");
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            throw;
        }
     
    }

    [HttpPost("getCuponCode")]
    public async Task<ActionResult<string>> getCuponCode(string userId = "dddd")
    {
        try
        {
            var getCuponEvery = 50;
            var wallet = await walletService.GetUserWalletByUserId(userId);
            if (wallet != null)
            {
                if(wallet< getCuponEvery) return Content("No enough money");
                var cupon = await walletService.GetCupon(userId);
                if (cupon != null) return Ok(cupon.CuponCode);
                return NotFound("No cupon code");
            }
            return NotFound("user not found");
        }
        catch (Exception e)
        {
           logger.LogError(e, e.Message);
            throw;
        }
    }
   
    
}