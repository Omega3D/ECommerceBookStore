using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bookstore.Infrastructure.Entities;

public class Book
{
    [Key]
    public int Id { get; set; }
    [Required]
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;
    [Required]
    [StringLength(500)]
    public string Description { get; set; } = string.Empty;
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    [Required]
    public string Isbn { get; set; } = string.Empty;
    [Required]
    public string ImageUrl { get; set; } = string.Empty;
}
