
using Dapper;
using MongoDB.Driver;
using MySqlConnector;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Repositories;
public class UserRepository(ILogger<UserRepository> logger, MongoDbContext mongoContext):IUserRepository
{
    public async Task<User?> GetUser(string userIdentify)
    {
        try
        {
            // var query = @"SELECT id AS Id,
            //                  email as Email,username as Username, password as Password
            //           FROM users WHERE username = @Username;";
            //
            // return await sqlConnection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });
            return mongoContext.Users.Find(u => u.Username == userIdentify || u.Id == userIdentify).FirstOrDefault();
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to get user - userRepository");
            throw;
        }
    }

    public async Task<User?> insertUser(User user)
    {
        try
        {
            // var insertQuery = @"INSERT INTO users (username, email, password)
            //     VALUES (@Username, @Email, @Password); SELECT * FROM users WHERE id = LAST_INSERT_ID();";
            // var newUser =  await sqlConnection.QuerySingleAsync<User>(insertQuery, user);
            // return newUser;
            mongoContext.Users.InsertOneAsync(user);
            return user;
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to insert user - userRepository");
            return null;
        }
    }

    public async void UpdateUserWallet(string userId)
    {
        try
        {
            var user = mongoContext.Users.Find(u => u.Id == userId).FirstOrDefault();
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.Set(u => u.Wallet, (user.Wallet-50));
            await mongoContext.Users.UpdateOneAsync(filter, update);
        }
        catch (Exception e)
        {
           logger.LogError(e,"failed to update user - userRepository");
            throw;
        }
    }
}