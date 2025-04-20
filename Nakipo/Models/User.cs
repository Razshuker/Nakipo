
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models
{
    public class User:LoginUser
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("email")]
    public string? Email { get; set; }

   

    [BsonElement("phone")]
    public string? Phone { get; set; }

  
}

    public class LoginUser
    {
        [BsonElement("username")]
        public string Username { get; set; }
    

        [BsonElement("password")]
        public string Password { get; set; }

    }
}
