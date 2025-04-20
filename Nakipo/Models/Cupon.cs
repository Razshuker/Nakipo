using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class Cupon
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("cupon-code")]
    public string CuponCode { get; set; }

    [BsonElement("used")]
    public bool Used { get; set; }
    
}