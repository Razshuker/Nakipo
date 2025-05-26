namespace Nakipo.Models;

public class ValidateResetTokenRequest
{
    public string Email { get; set; }
    public string Token { get; set; }
}