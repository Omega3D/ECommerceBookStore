using System.ComponentModel.DataAnnotations;

namespace Bookstore.Api.ViewModels.Auth;

public class LoginViewModel
{
    [Required, EmailAddress] public string Email { get; set; } = string.Empty;
    [Required] public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; }
}
