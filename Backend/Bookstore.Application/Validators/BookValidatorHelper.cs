using Bookstore.Application.Dtos;

namespace Bookstore.Api.Validators;

public class BookValidatorHelper
{
    public List<string> ErrorsList { get; set; } = new List<string>();

    public List<string> ValidateBookCreateModel(BookRequestDto book)
    {
        ErrorsList.Clear();

        if (string.IsNullOrWhiteSpace(book.Title))
        {
            ErrorsList.Add("Title is required!");
        }
        else if (book.Title.Length > 200)
        {
            ErrorsList.Add("Title cannot exceed 200 characters!");
        }

        if (book.Description?.Length > 2000)
        {
            ErrorsList.Add("Description cannot exceed 2000 characters!");
        }

        if (book.Price <= 0)
        {
            ErrorsList.Add("Price must be greater than 0!");
        }
        else if (book.Price > 10000)
        {
            ErrorsList.Add("Price cannot exceed 10000!");
        }

        if (string.IsNullOrWhiteSpace(book.Isbn))
        {
            ErrorsList.Add("ISBN is required!");
        }
        else if (!IsValidIsbn(book.Isbn))
        {
            ErrorsList.Add("Invalid ISBN format! Must be ISBN-10 or ISBN-13.");
        }

        if (!string.IsNullOrWhiteSpace(book.ImageUrl))
        {
            if (!IsValidUrl(book.ImageUrl))
            {
                ErrorsList.Add("Invalid Image URL format!");
            }
            else if (book.ImageUrl.Length > 500)
            {
                ErrorsList.Add("Image URL cannot exceed 500 characters!");
            }
        }

        return ErrorsList;
    }

    public List<string> ValidateBookUpdateModel(BookUpdateDto book)
    {
        ErrorsList.Clear();

        if (string.IsNullOrWhiteSpace(book.Title))
        {
            ErrorsList.Add("Title is required!");
        }
        else if (book.Title.Length > 200)
        {
            ErrorsList.Add("Title cannot exceed 200 characters!");
        }

        if (book.Description?.Length > 2000)
        {
            ErrorsList.Add("Description cannot exceed 2000 characters!");
        }

        if (book.Price <= 0)
        {
            ErrorsList.Add("Price must be greater than 0!");
        }
        else if (book.Price > 10000)
        {
            ErrorsList.Add("Price cannot exceed 10000!");
        }

        if (string.IsNullOrWhiteSpace(book.Isbn))
        {
            ErrorsList.Add("ISBN is required!");
        }
        else if (!IsValidIsbn(book.Isbn))
        {
            ErrorsList.Add("Invalid ISBN format! Must be ISBN-10 or ISBN-13.");
        }

        if (!string.IsNullOrWhiteSpace(book.ImageUrl))
        {
            if (!IsValidUrl(book.ImageUrl))
            {
                ErrorsList.Add("Invalid Image URL format!");
            }
            else if (book.ImageUrl.Length > 500)
            {
                ErrorsList.Add("Image URL cannot exceed 500 characters!");
            }
        }

        return ErrorsList;
    }

    private bool IsValidIsbn(string isbn)
    {
        string cleanIsbn = isbn.Replace("-", "").Replace(" ", "");

        if (cleanIsbn.Length == 10)
        {
            return System.Text.RegularExpressions.Regex.IsMatch(cleanIsbn, @"^\d{9}[\dX]$");
        }
        else if (cleanIsbn.Length == 13)
        {
            return System.Text.RegularExpressions.Regex.IsMatch(cleanIsbn, @"^\d{13}$");
        }

        return false;
    }

    private bool IsValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
               && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}
