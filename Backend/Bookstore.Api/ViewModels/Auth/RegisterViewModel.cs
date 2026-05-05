using System.ComponentModel.DataAnnotations;

namespace Bookstore.Api.ViewModels.Auth;

public class RegisterViewModel
{
    [Required] public string FullName { get; set; } = string.Empty;
    [Required, EmailAddress] public string Email { get; set; } = string.Empty;
    [Required, MinLength(4)] public string Password { get; set; } = string.Empty;
    [Compare("Password")] public string ConfirmPassword { get; set; } = string.Empty;
    [RegularExpression(@"^\+?[0-9\s\-\(\)]{7,15}$", ErrorMessage = "Phone must contain only digits, +, -, spaces, or brackets")]
    [Required] public string PhoneNumber { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}
