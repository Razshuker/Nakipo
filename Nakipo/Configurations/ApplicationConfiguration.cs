namespace Nakipo.Configurations;

public class ApplicationConfiguration
{
    private static string Get(string name)
    {
        return Environment.GetEnvironmentVariable(name) ??
               throw new InvalidOperationException(
                   $"{name} environment variable is missing");
    }

    public static class DbSettings
    {
        public static string MongodbConnectionString { get; } = Get("MongoDbConnectionString");
        public static string MongodbDatabase { get; } = Get("MongodbDatabase");
    }

    public static class GoogleSettings
    {
        public static string GoogleClientId { get; } = Get("GoogleClientId");
        public static string GoogleClientSecret { get; } = Get("GoogleClientSecret");
    }
    public static class TiktokSettings
    {
        public static string TiktokClientKey { get; } = Get("TiktokClientKey");
        public static string TiktokClientSecret { get; } = Get("TiktokClientSecret");
        public static string TiktokRedirectUri { get; } = Get("TiktokRedirectUri");

    }

    public static class EmailSettings
    {
        public static string SmtpHost { get; } = Get("SmtpHost");
        public static string SmtpPort { get; } = Get("SmtpPort");
        public static string SmtpUsername { get; } = Get("SmtpUsername");
        public static string RefreshToken { get; } = Get("RefreshToken");
    }


    public static string HashToken { get; } = Get("HashToken");
}