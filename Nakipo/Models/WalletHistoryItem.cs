using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class WalletHistoryItem
{
    [BsonElement("month")]
    public string? MonthYear { get; set; }

    [BsonElement("wallet")]
    public int? Wallet { get; set; }
}