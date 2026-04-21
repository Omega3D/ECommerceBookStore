using Bookstore.Infrastructure.Entities;

namespace Bookstore.Application.Interfaces;

public interface IBooksService
{
    public Task<List<Book>> GetAllBooks();
}
