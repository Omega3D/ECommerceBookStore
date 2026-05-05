using Microsoft.AspNetCore.Identity;

namespace Bookstore.Infrastructure.Entities;

public class User : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}
