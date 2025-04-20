using MongoDB.Driver;
using Nakipo.Configurations;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Nakipo.Models;

namespace Nakipo.Services;

public class MonthlyUserUpdaterService(IServiceProvider serviceProvider, MongoDbContext mongoContext) : BackgroundService
{

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var today = DateTime.UtcNow;

            if (today.Day == 1)
            {
                using (var scope = serviceProvider.CreateScope())
                {
                    var usersCollection = mongoContext.Users;

                    var users = await usersCollection.Find(Builders<User>.Filter.Empty).ToListAsync(stoppingToken);

                    foreach (var user in users)
                    {
                        if (user.WalletHistory == null)
                        {
                            user.WalletHistory = new List<WalletHistoryItem>();
                        }
                        
                        
                        user.WalletHistory.Add(new WalletHistoryItem
                        {
                            MonthYear = today.AddMonths(-1).ToString("yyyy-MM"),
                            Wallet = user.Wallet
                        });

                        user.Wallet = 0;

                        await usersCollection.ReplaceOneAsync(
                            u => u.Id == user.Id, 
                            user, 
                            cancellationToken: stoppingToken
                        );
                    }

                }
            }

            // Wait exactly 24 hours
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }
}