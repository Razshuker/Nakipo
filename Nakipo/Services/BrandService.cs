using Nakipo.Models;
using Nakipo.Repositories;

namespace Nakipo.Services;

public class BrandService(ILogger<BrandService> logger, IBrandRepository brandRepository) : IBrandService
{
    public async Task<List<Brand>?> GetAllBrands()
    {
        try
        {
            return await brandRepository.GetAllBrandsAsync();
        }
        catch (Exception e)
        {
            logger.LogError(e.Message, "Failed to get all brands - brandService");
            return null;
        }
    }
}