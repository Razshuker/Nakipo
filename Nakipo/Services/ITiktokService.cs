using Nakipo.Models;

namespace Nakipo.Services;

public interface ITiktokService
{
    Task<User?> LoginOrRegisterWithTikTok(string code, string openId);
}