namespace Bookstore.Application.Dtos.Pagination;

public class PagedResult<T>
{
    public List<T> Items { get; init; } = [];
    public Pagination Pagination { get; init; } = new Pagination();
}

public class Pagination
{
    public int TotalCount { get; init; }
    public int PageNumber { get; init; }
    public int PageSize { get; init; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasNext => PageNumber < TotalPages;
    public bool HasPrevious => PageNumber > 1;
}
