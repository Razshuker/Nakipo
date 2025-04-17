
using System.Text.Json.Serialization;

namespace Nakipo.Models
{
    public class User:LoginUser
{
    public int Id { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }
  
}

    public class LoginUser
    {
        [JsonPropertyName("username")]

        public string Username { get; set; }
    

        [JsonPropertyName("password")]

        public string Password { get; set; } 
    }
}
