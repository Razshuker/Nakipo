using MongoDB.Driver;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Repositories;

public class BrandRepository(ILogger<BrandRepository> logger, MongoDbContext mongoDbContext) : IBrandRepository
{
    public async Task<List<Brand>?> GetAllBrandsAsync()
    {
        try
        {
            var brands = await mongoDbContext.Brands.Find(_ => true).ToListAsync();
            return brands;
        }
        catch (Exception e)
        {
            logger.LogError(e.Message, "Faild to get all brands - brandRepository");
            return null;
        }
    }

    public async Task<Brand> GetBrandByName(string brandName)
    {
        try
        {
            var brand = await mongoDbContext.Brands.Find(b => b.Name.ToLowerInvariant() == brandName.ToLowerInvariant())
                .FirstOrDefaultAsync();
            return brand;
        }
        catch (Exception e)
        {
            logger.LogError(e.Message, "Faild to get brand by name - brandRepository");
            return null;
        }
    }
}