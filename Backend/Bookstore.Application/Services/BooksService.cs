using Bookstore.Application.Dtos;
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

    public async Task<Book?> GetBookById(int id)
    {
        return await context.Books
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<int> CreateBook(BookRequestDto bookDto)
    {
        var book = new Book
        {
            Title = bookDto.Title,
            Description = bookDto.Description,
            Price = bookDto.Price,
            Isbn = bookDto.Isbn,
            ImageUrl = bookDto.ImageUrl
        };

        await context.Books.AddAsync(book);
        await context.SaveChangesAsync();

        return book.Id;
    }

    public async Task UpdateBook(int id, BookUpdateDto dto)
    {
        var book = await context.Books
            .FirstOrDefaultAsync(x => x.Id == id);

        if (book == null)
            throw new Exception($"Book with id {id} not found");

        book.Title = dto.Title;
        book.Description = dto.Description;
        book.Price = dto.Price;
        book.Isbn = dto.Isbn;
        book.ImageUrl = dto.ImageUrl;

        await context.SaveChangesAsync();
    }

    public async Task<bool> DeleteBook(int id)
    {
        var book = await context.Books
        .FirstOrDefaultAsync(x => x.Id == id);

        if (book == null)
            return false;

        context.Books.Remove(book);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<IEnumerable<Book>> SearchBookByTitle(string? title)
    {
        var query = context.Books.AsQueryable();

        if (!string.IsNullOrEmpty(title))
        {
            var lowerValue = title.ToLower();
            query = query.Where(x => x.Title.ToLower().Contains(lowerValue));
        }

        return await query.ToListAsync();
    }
}
