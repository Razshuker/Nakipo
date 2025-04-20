
using Dapper;
using MongoDB.Driver;
using MySqlConnector;
using Nakipo.Configurations;
using Nakipo.Models;

namespace Nakipo.Repositories;
public class UserRepository(ILogger<UserRepository> logger, MongoDbContext _mongoContext):IUserRepository
{
    public async Task<User?> GetUser(string username)
    {
        try
        {
            // var query = @"SELECT id AS Id,
            //                  email as Email,username as Username, password as Password
            //           FROM users WHERE username = @Username;";
            //
            // return await sqlConnection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });
            return _mongoContext.Users.Find(u => u.Username == username).FirstOrDefault();
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
            _mongoContext.Users.InsertOneAsync(user);
            return user;
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to insert user - userRepository");
            return null;
        }
    }
}