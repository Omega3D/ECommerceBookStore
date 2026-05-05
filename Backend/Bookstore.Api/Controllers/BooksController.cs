using Bookstore.Api.Validators;
using Bookstore.Api.ViewModels;
using Bookstore.Api.ViewModels.Request;
using Bookstore.Application.Dtos;
using Bookstore.Application.Dtos.Pagination;
using Bookstore.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(IBooksService booksService, BookValidatorHelper bookValidatorHelper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<BookViewModel>>> GetAllBooks()
    {
        var books = await booksService.GetAllBooks();

        var result = books.Select(x => new BookViewModel()
        {
            Id = x.Id,
            Title = x.Title,
            Description = x.Description,
            Price = x.Price,
            Isbn = x.Isbn,
            ImageUrl = x.ImageUrl,
        })
        .ToList();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookViewModel>> GetBookById(int id)
    {
        var book = await booksService.GetBookById(id);

        if (book == null)
            return NotFound($"Book with id {id} not found");

        var result = new BookViewModel()
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Price = book.Price,
            Isbn = book.Isbn,
            ImageUrl = book.ImageUrl,
        };

        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<int>> CreateBook(BookRequestViewModel bookViewModel)
    {
        var book = new BookRequestDto()
        {
            Title = bookViewModel.Title,
            Description = bookViewModel.Description,
            Price = bookViewModel.Price,
            Isbn = bookViewModel.Isbn,
            ImageUrl = bookViewModel.ImageUrl,
        };

        var errors = bookValidatorHelper.ValidateBookCreateModel(book);

        if (errors.Count > 0)
        {
            return BadRequest(errors);
        }

        return await booksService.CreateBook(book);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, BookUpdateViewModel bookViewModel)
    {
        var book = await booksService.GetBookById(id);

        if (book == null)
            return NotFound($"Book with id {id} not found");

        var parsed = new BookUpdateDto()
        {
            Title = bookViewModel.Title,
            Description = bookViewModel.Description,
            Price = bookViewModel.Price,
            Isbn = bookViewModel.Isbn,
            ImageUrl = bookViewModel.ImageUrl,
        };

        var errors = bookValidatorHelper.ValidateBookUpdateModel(parsed);

        if (errors.Count > 0)
        {
            return BadRequest(errors);
        }

        await booksService.UpdateBook(id, parsed);

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var success = await booksService.DeleteBook(id);

        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpGet("query")]
    public async Task<ActionResult<PagedResult<BookViewModel>>> Get([FromQuery] ProductFilterQuery query)
    {
        var result = await booksService.GetPaged(query);

        return Ok(result);
    }
}