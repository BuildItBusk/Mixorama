using Microsoft.AspNetCore.Authentication.Cookies;
using Mixorama.Server.Authentication;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddHttpContextAccessor();

    var configuration = builder.Configuration;

    builder.Services.AddControllers();
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie(o =>
    {
        o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Cookie.HttpOnly = true;
    })
    .AddOpenIdConnect("Auth0", options => AuthenticationExtensions.ConfigureOpenIdConnect(options, configuration));

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