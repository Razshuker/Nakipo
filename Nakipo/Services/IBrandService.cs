using Nakipo.Models;

namespace Nakipo.Services;

public interface IBrandService
{
    Task<List<Brand>> GetAllBrands();
}