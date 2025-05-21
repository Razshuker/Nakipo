using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IBrandRepository
{
    Task<List<Brand>> GetAllBrandsAsync();
    Task<Brand> GetBrandByName(string brandName);
}