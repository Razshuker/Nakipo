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
        public static string MysqlConnectionString { get; } = Get("ConnectionString");
    }
    
    public static string HashToken { get; } = Get("HashToken");
}