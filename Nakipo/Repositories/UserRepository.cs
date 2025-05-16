using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Bson;
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
            if (ObjectId.TryParse(userIdentify, out _))
            {
                return await mongoContext.Users.Find(u => u.Id == userIdentify).FirstOrDefault();            }
            else
            {
                return await mongoContext.Users.Find(u => u.Username.ToLowerInvariant() == userIdentify.ToLowerInvariant() || u.Email.ToLowerInvariant() == userIdentify.ToLowerInvariant()).FirstOrDefault();
            }
           
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to get user - userRepository");
            return null;
        }
    }


    // public async void UpdateUserWallet(string userId ,int? newWalletValue)
    // {
    //     try
    //     {
    //         var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
    //         var update = Builders<User>.Update.Set(u => u.Wallet, newWalletValue);
    //
    //         var usersCollection = mongoContext.Users;
    //         
    //         await usersCollection.UpdateOneAsync(filter, update);
    //     }
    //     catch (Exception e)
    //     {
    //        logger.LogError(e,"failed to update userWallet by report");
    //         throw;
    //     }
    // }

    public async Task<int?> GetUserWalletByReports(string userIdentify, int month, int year)
    {
        try
        {
                var start = new DateTime(year, month, 1);
                var end = start.AddMonths(1);

                var pipeline = new BsonDocument[]
                {
                    new BsonDocument("$match", new BsonDocument("_id", new ObjectId(userIdentify))),

                    new BsonDocument("$project", new BsonDocument
                    {
                        { "ReportsThisMonth", new BsonDocument
                            {
                                { "$filter", new BsonDocument
                                    {
                                        { "input", "$reports" },
                                        { "as", "report" },
                                        { "cond", new BsonDocument
                                            {
                                                { "$and", new BsonArray
                                                    {
                                                        new BsonDocument { { "$gte", new BsonArray { "$$report.date", start } } },
                                                        new BsonDocument { { "$lt", new BsonArray { "$$report.date", end } } },
                                                        new BsonDocument { { "$eq", new BsonArray { "$$report.report-used", false } } }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),

                    new BsonDocument("$project", new BsonDocument
                    {
                        { "count", new BsonDocument { { "$size", "$ReportsThisMonth" } } }
                    })
                };
                var usersCollection = mongoContext.Users;
                var result = await usersCollection.Aggregate<BsonDocument>(pipeline).FirstOrDefaultAsync();
                return result != null ? result["count"].AsInt32 : 0;
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to get user wallet by reports - userRepository");
            throw;
        }
    }

    public async Task<User?> InsertUser(User user)
    {
        try
        {
            await mongoContext.Users.InsertOneAsync(user);
            return user;
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to insert user - userRepository");
            return null;
        }
    }

    public async Task<bool> UpdateUserReports(string userId, int month, int year, int usedReportsForCupon)
    {
        try
        {
            var startOfMonth = new DateTime(year, month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            var usersCollection = mongoContext.Users;

            var user = await usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Find the first 5 reports that match the month and report-used == false
            var reportsToUpdate = user.Reports
                .Where(r => r.Date >= startOfMonth && r.Date < startOfNextMonth && r.ReportUsed == false)
                .Take(usedReportsForCupon)
                .ToList();

            
            foreach (var report in reportsToUpdate)
            {
                report.ReportUsed = true;
            }

            
           var result = await usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
           return result.IsAcknowledged && result.ModifiedCount > 0;
        }
        catch (Exception e)
        {
           logger.LogError(e,"failed to update user - userRepository");
            throw;
        }
    }

    public async Task<List<User>> GetTopUsersForMonth(int month, int year)
    {
        var startOfMonth = new DateTime(year, month, 1);
        var startOfNextMonth = startOfMonth.AddMonths(1);
        

        var usersCollection = mongoContext.Users;

        var users = await usersCollection.Find(_ => true).ToListAsync();

        logger.LogInformation(users.Count.ToString());

        foreach (var user in users)
        {
            user.Wallet = user.Reports.Count(r => r.Date >= startOfMonth && r.Date < startOfNextMonth);
        }

        var topUsers = users
            .OrderByDescending(u => u.Wallet)
            .Take(10)
            .ToList();

        return topUsers;
    }

    public async Task<User> InsertReport(WalletReport report, string userId)
    {
        try
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);

            var update = Builders<User>.Update.Push(u => u.Reports, report);

            var options = new FindOneAndUpdateOptions<User>
            {
                ReturnDocument = ReturnDocument.After
            };

           return await mongoContext.Users.FindOneAndUpdateAsync(filter, update, options);

        }
        catch (Exception e)
        {
           logger.LogError(e,"failed to insert report - userRepository");
            throw;
        }
    }

    public async Task<User?> UpdateUser(User user)
    {
        try
        {
            if (user != null)
            {
                var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);

                var update = Builders<User>.Update
                    .Set(u => u.Email, user.Email)
                    .Set(u => u.FullName, user.FullName)
                    .Set(u => u.Phone, user.Phone)
                    .Set(u => u.Username, user.Username)
                    .Set(u => u.DogName, user.DogName)
                    .Set(u => u.City, user.City)
                    .Set(u=> u.Image, user.Image)
                    .Set(u=> u.Cupons, user.Cupons);
                // Add any other fields you want to update
                
                await mongoContext.Users.UpdateOneAsync(filter, update);
                return await GetUser(user.Username);
            }

            return null;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to update user - userRepository");
            return null;
        }

    }

    public async Task<User?> UpdateUserPassword(string userId, string newPassword)
    {
        try
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);

            var update = Builders<User>.Update
                .Set(u => u.Password, newPassword);
                
            return await mongoContext.Users.FindOneAndUpdateAsync(
                filter,
                update,
                new FindOneAndUpdateOptions<User>
                {
                    ReturnDocument = ReturnDocument.After 
                });
        }
        catch (Exception e)
        {
            logger.LogError(e,"failed to update user password - userRepository");
            throw;
        }
    }
}