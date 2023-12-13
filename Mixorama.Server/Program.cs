using Mixorama.Server.Authentication;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddHttpContextAccessor();

    var configuration = builder.Configuration;

    builder.Services.AddControllers();
    builder.Services.AddBackendForFrontendAuthentication(configuration);

    builder.Services.AddHttpClient();
}

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
        app.UseDeveloperExceptionPage();

    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();
    app.MapControllers();
    app.MapFallbackToFile("/index.html");
    app.Run();
}