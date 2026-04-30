using Bookstore.Application.Dtos;
using Bookstore.Application.Dtos.Pagination;
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

    public async Task<PagedResult<Book>> GetPaged(ProductFilterQuery q)
    {
        var query = context.Books
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(q.Search))
            query = query.Where(p => p.Title.ToLower().Contains(q.Search.ToLower()));

        if(q.MinPrice.HasValue)
            query = query.Where(p => p.Price >=  q.MinPrice.Value);

        if (q.MaxPrice.HasValue)
            query = query.Where(p => p.Price <= q.MaxPrice.Value);

        query = q.SortBy switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderByDescending(p => p.Title)
        };

        var totalPages = await query.CountAsync();
        var items = await query
            .Skip((q.PageNumber - 1) * q.PageSize)
            .Take(q.PageSize)
            .ToListAsync();

        return new PagedResult<Book>
        {
            Items = items,
            Pagination = new Pagination()
            {
                TotalCount = totalPages,
                PageNumber = q.PageNumber,
                PageSize = q.PageSize,
            }
        };
    }
}
