using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace Mixorama.Server.Authentication;

internal static class AuthenticationExtensions
{
    internal static IServiceCollection AddBackendForFrontendAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        _ = services
        .AddAuthentication(options =>
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
            o.Events.OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = 401;
                return Task.CompletedTask;
            };
        })
        .AddOpenIdConnect("Auth0", options =>
        {
            options.Authority = $"https://{configuration["Auth0:Domain"]}";
            options.ClientId = configuration["Auth0:ClientId"];
            options.ClientSecret = configuration["Auth0:ClientSecret"];
            options.TokenValidationParameters = new TokenValidationParameters
            {
                NameClaimType = "name"
            };

            options.Scope.Clear();
            options.Scope.Add("openid");
            options.Scope.Add("profile");
            options.Scope.Add("email");

            options.ResponseType = OpenIdConnectResponseType.CodeIdToken;
            options.ResponseMode = OpenIdConnectResponseMode.FormPost;

            options.CallbackPath = new PathString("/callback");
            options.ClaimsIssuer = "Auth0";
            options.SaveTokens = true;

            options.Events = new OpenIdConnectEvents
            {
                OnRedirectToIdentityProviderForSignOut = (context) =>
                {
                    var logoutUri = $"https://{configuration["Auth0:Domain"]}/v2/logout?client_id={configuration["Auth0:ClientId"]}";

                    var postLogoutUri = context.Properties.RedirectUri;
                    if (!string.IsNullOrEmpty(postLogoutUri))
                    {
                        if (postLogoutUri.StartsWith("/"))
                        {
                            var request = context.Request;
                            postLogoutUri = request.Scheme + "://" + request.Host + request.PathBase + postLogoutUri;
                        }
                        logoutUri += $"&returnTo={Uri.EscapeDataString(postLogoutUri)}";
                    }
                    context.Response.Redirect(logoutUri);
                    context.HandleResponse();

                    return Task.CompletedTask;
                }
            };
        });
    
        return services;
    }
}