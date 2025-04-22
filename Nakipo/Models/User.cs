
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
    [BsonElement("wallet")]
    public int? Wallet { get; set; }
    [BsonElement("wallet-history")]
    public List<WalletHistoryItem>? WalletHistory { get; set; } = new();
    [BsonElement("reports")]

    public List<WalletReport>? Reports { get; set; } = new();

  
}
}
