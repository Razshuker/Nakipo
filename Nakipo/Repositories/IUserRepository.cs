using Nakipo.Models;

namespace Nakipo.Repositories;

public interface IUserRepository
{
    Task<User?> GetUser(string username);
    Task<User?> insertUser(User user);
}