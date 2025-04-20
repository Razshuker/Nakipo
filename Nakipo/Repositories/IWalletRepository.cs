using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IWalletRepository
{
    Task<Cupon> GetCupon();
    void CuponUsed(string cuponId);
}