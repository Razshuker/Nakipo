using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class ResetPasswordRequest
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("email")] public string Email { get; set; }
    [BsonElement("token")] public string? Token { get; set; }
    [BsonElement("expiry_date")] public DateTime ExpiryDate { get; set; }
    [BsonElement("isUsed")] public bool IsUsed { get; set; }
}