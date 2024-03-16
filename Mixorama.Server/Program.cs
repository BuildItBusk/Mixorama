using System.Text.Encodings.Web;
using Microsoft.EntityFrameworkCore;
using Mixorama.Server.Authentication;
using Mixorama.Server.Database;

var builder = WebApplication.CreateBuilder(args);
{
    var configuration = builder.Configuration;
    
    builder.Logging.ClearProviders();
    builder.Logging.AddJsonConsole(options =>  
    {
        options.IncludeScopes = false;
        options.TimestampFormat = "HH:mm:ss"; 
        options.JsonWriterOptions = new() 
        { 
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            Indented = true
        };
    });

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddBackendForFrontendAuthentication(configuration);
    builder.Services.AddHttpClient();
    builder.Services.AddControllers();

    builder.Services.AddDbContext<CocktailContext>(opt =>
        opt.UseSqlServer(configuration.GetConnectionString("CocktailContext")));

    // Swagger API Documentation
    builder.Services.AddMvc();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    // Use Exception Page in Development
    if (app.Environment.IsDevelopment())
        app.UseDeveloperExceptionPage();

    // Use SPA settings
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();
    app.MapFallbackToFile("/index.html");

    // Use Authentication and Authorization
    app.UseAuthentication();
    app.UseAuthorization();

    // Use Swagger API Documentation in Development
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.MapControllers();
    app.Run();
}