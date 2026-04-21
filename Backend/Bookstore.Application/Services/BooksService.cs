using Bookstore.Application.Interfaces;
using Bookstore.Infrastructure;
using Bookstore.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.Application.Services;

public class BooksService
    (AppDbContext context) : IBooksService
{
    public async Task<List<Book>> GetAllBooks()
    {
        return await context.Books
            .AsNoTracking()
            .ToListAsync();
    }
}
