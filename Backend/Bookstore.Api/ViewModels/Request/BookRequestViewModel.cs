namespace Bookstore.Api.ViewModels.Request;

public class BookRequestViewModel
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Isbn { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}
