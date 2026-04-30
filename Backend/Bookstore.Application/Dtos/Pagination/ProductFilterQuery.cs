namespace Bookstore.Application.Dtos.Pagination
{
    public class ProductFilterQuery
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;

        public string? Search { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        //"price_asc", "price_desc", "rating_desc"
        public string? SortBy { get; set; }
    }
}
