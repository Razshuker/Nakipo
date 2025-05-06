using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class Brand
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("name")]
    public string Name { get; set; } 
    
    [BsonElement("logo")]
    public string? Logo { get; set; }
    
    [BsonElement("site_link")]
    public string? SiteLink { get; set; }
    
    [BsonElement("gift")]
    public string Gift { get; set; }
    
    
}