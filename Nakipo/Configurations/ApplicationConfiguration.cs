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
    
    
    public static string HashToken { get; } = Get("HashToken");
}