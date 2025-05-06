using MongoDB.Driver;
using Nakipo.Models;

namespace Nakipo.Configurations;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    public IMongoCollection<Cupon> Cupons => _database.GetCollection<Cupon>("cupons");
    public IMongoCollection<Brand> Brands => _database.GetCollection<Brand>("brands");
}