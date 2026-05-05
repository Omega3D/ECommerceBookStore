using Bookstore.Api.Validators;
using Bookstore.Application.Interfaces;
using Bookstore.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Bookstore.Application.ServiceExtensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IBooksService, BooksService>();
        services.AddScoped<BookValidatorHelper>();
        services.AddScoped<JwtService>();

        return services;
    }
}
