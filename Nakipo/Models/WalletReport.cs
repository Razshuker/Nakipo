using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class WalletReport
{
    [BsonElement("image")]

    public string Image { get; set; }

    [BsonElement("date")]

    public DateTime Date { get; set; }
    [BsonElement("expiration-date")]

    public DateTime ExpirationDate { get; set; } 
   
    [BsonElement("report-used")]

    public bool ReportUsed { get; set; }
    [BsonElement("location")]

    public Location Location { get; set; }
    
    
}