
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
    public string Email { get; set; }
  [BsonElement("full_name")]
    public string FullName { get; set; }
  [BsonElement("city")]
    public string City { get; set; }
 [BsonElement("image")]
    public string? Image { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }
    [BsonElement("wallet")]
    public int? Wallet { get; set; }
    [BsonElement("wallet_history")]
    public List<WalletHistoryItem>? WalletHistory { get; set; } = new();
    [BsonElement("reports")]

    public List<WalletReport>? Reports { get; set; } = new();
    
    [BsonElement("dog_name")]
    public string DogName { get; set; }

  
}
}
