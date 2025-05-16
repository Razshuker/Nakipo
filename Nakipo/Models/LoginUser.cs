using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class LoginUser
{
    [BsonElement("username")]
    public string Username { get; set; }
    

    [BsonElement("password")]
    public string? Password { get; set; }

}