using MongoDB.Driver;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Repositories;

public class WalletRepository (ILogger<WalletRepository> logger, MongoDbContext mongoContext): IWalletRepository
{
    public async Task<Cupon> GetCupon()
    {
        try
        {
            return await mongoContext.Cupons.Find(c => !c.Used).FirstOrDefaultAsync();
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            throw;
        }
      
    }

    public async void CuponUsed(string cuponId)
    {
        try
        {
            var filter = Builders<Cupon>.Filter.Eq(x => x.Id, cuponId);
            var update = Builders<Cupon>.Update.Set(c => c.Used, true);
            await mongoContext.Cupons.UpdateOneAsync(filter, update);
        }
        catch (Exception e)
        {
           logger.LogError(e, e.Message);
            throw;
        }
    }
}