using Microsoft.AspNetCore.Mvc;
using Nakipo.Models;
using Nakipo.Repositories;
using Nakipo.Services;

namespace Nakipo.Controllers;

[ApiController]
[Route("[controller]")]
public class BrandController(ILogger<BrandController> logger, IBrandService brandService):ControllerBase
{
    [HttpGet("getBrands")]
    public async Task<ActionResult<List<Brand>>> GetBrands()
    {
        try
        {
            var brands = await brandService.GetAllBrands();
            return Ok(brands);
        }
        catch (Exception e)
        {
        logger.LogError(e.Message);
            throw;
        }
    }
    
}