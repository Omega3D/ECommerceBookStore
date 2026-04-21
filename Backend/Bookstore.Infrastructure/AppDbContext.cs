using Bookstore.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.Infrastructure;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
}
