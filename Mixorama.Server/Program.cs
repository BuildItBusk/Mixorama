using Mixorama.Server.Authentication;

var builder = WebApplication.CreateBuilder(args);
{
    var configuration = builder.Configuration;
    
    builder.Logging.ClearProviders();
    builder.Logging.AddJsonConsole(options => options.JsonWriterOptions = new() 
    { 
        Indented = true 
    });

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddBackendForFrontendAuthentication(configuration);
    builder.Services.AddHttpClient();
    builder.Services.AddControllers();

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