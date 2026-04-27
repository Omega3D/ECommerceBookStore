using Bookstore.Application.Dtos;
using Bookstore.Infrastructure.Entities;

namespace Bookstore.Application.Interfaces;

public interface IBooksService
{
    public Task<List<Book>> GetAllBooks();
    public Task<Book?> GetBookById(int id);
    public Task<int> CreateBook(BookRequestDto bookDto);
    public Task UpdateBook(int id, BookUpdateDto dto);
    public Task<bool> DeleteBook(int id);
    public Task<IEnumerable<Book>> SearchBookByTitle(string? title);
}
