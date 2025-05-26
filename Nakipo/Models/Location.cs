using MongoDB.Bson.Serialization.Attributes;

namespace Nakipo.Models;

public class Location
{
    [BsonElement("longitude")] public double Longitude { get; set; }
    [BsonElement("latitude")] public double Latitude { get; set; }
}