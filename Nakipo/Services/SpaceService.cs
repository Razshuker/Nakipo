using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;

namespace Nakipo.Services;

public class SpaceService : ISpaceService

{
    private const string AccessKey = "DO00Y89GWCZ3QMFUJA8D";
    private const string SecretKey = "5BafLXH3iHS2R0E2ixt7DM+viV1TbozKH1qpxBk6+i8";
    private const string Region = "ams3";
    private const string Service = "s3";
    private const string Bucket = "dogood-users-photos";
    private const string Host = Bucket + ".ams3.digitaloceanspaces.com";

    public async Task UploadFileAsync(IFormFile file, string userId, string fileImageName)
    {
        var fileName = fileImageName;
        var filePath = $"/{userId}/{fileName}";
        var endpoint = $"https://{Host}{filePath}";

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        var payloadBytes = ms.ToArray();
        var payloadHash = Hash(payloadBytes);

        var now = DateTime.UtcNow;
        var amzDate = now.ToString("yyyyMMddTHHmmssZ");
        var dateStamp = now.ToString("yyyyMMdd");

        var canonicalUri = Uri.EscapeUriString(filePath);

        var canonicalRequest = CreateCanonicalRequest("PUT", canonicalUri, Host, payloadHash, amzDate);
        var stringToSign = CreateStringToSign(canonicalRequest, amzDate, dateStamp);
        var signature = CalculateSignature(SecretKey, dateStamp, Region, Service, stringToSign);

        var authHeader = $"AWS4-HMAC-SHA256 Credential={AccessKey}/{dateStamp}/{Region}/{Service}/aws4_request, " +
                         $"SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature={signature}";

        using var client = new HttpClient();
        client.Timeout = TimeSpan.FromMinutes(2);
        client.DefaultRequestHeaders.ExpectContinue = false;

        var request = new HttpRequestMessage(HttpMethod.Put, endpoint);
        request.Headers.TryAddWithoutValidation("Authorization", authHeader);
        request.Headers.TryAddWithoutValidation("x-amz-date", amzDate);
        request.Headers.TryAddWithoutValidation("x-amz-content-sha256", payloadHash);
        // public files
        request.Headers.TryAddWithoutValidation("x-amz-acl", "public-read");
        request.Headers.Host = Host;

        request.Content = new ByteArrayContent(payloadBytes);
        request.Content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

        var response = await client.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            throw new Exception($"Upload failed: {response.StatusCode}\n{content}");
        }
    }

    private static string CreateCanonicalRequest(string method, string uri, string host, string payloadHash,
        string amzDate)
    {
        var canonicalHeaders =
            $"host:{host}\n" +
            $"x-amz-content-sha256:{payloadHash}\n" +
            $"x-amz-date:{amzDate}\n";
        var signedHeaders = "host;x-amz-content-sha256;x-amz-date";
        return $"{method}\n{uri}\n\n{canonicalHeaders}\n{signedHeaders}\n{payloadHash}";
    }

    private static string CreateStringToSign(string canonicalRequest, string amzDate, string dateStamp)
    {
        var scope = $"{dateStamp}/{Region}/{Service}/aws4_request";
        var hashedRequest = Hash(Encoding.UTF8.GetBytes(canonicalRequest));
        return $"AWS4-HMAC-SHA256\n{amzDate}\n{scope}\n{hashedRequest}";
    }

    private static string CalculateSignature(string key, string dateStamp, string region, string service,
        string stringToSign)
    {
        byte[] kDate = HmacSHA256(Encoding.UTF8.GetBytes("AWS4" + key), dateStamp);
        byte[] kRegion = HmacSHA256(kDate, region);
        byte[] kService = HmacSHA256(kRegion, service);
        byte[] kSigning = HmacSHA256(kService, "aws4_request");
        byte[] signatureBytes = HmacSHA256(kSigning, stringToSign);
        return Convert.ToHexString(signatureBytes).ToLower();
    }

    private static string Hash(byte[] data)
    {
        using var sha = SHA256.Create();
        return Convert.ToHexString(sha.ComputeHash(data)).ToLower();
    }

    private static byte[] HmacSHA256(byte[] key, string data)
    {
        using var hmac = new HMACSHA256(key);
        return hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
    }
}