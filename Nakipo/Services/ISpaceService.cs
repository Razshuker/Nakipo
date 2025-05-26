namespace Nakipo.Services;

public interface ISpaceService
{
    Task UploadFileAsync(IFormFile file, string userId, string fileImageName);
}