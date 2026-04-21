using Bookstore.Application.Interfaces;
using Bookstore.Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DictionaryController(IBooksService booksService)
{
    
    [HttpGet("Books")]
    public async Task<List<Book>> GetAllBooks()
    {
        return await booksService.GetAllBooks();
    }
}