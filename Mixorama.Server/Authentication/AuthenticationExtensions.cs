using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace Mixorama.Server.Authentication;

internal static class AuthenticationExtensions
{
    internal static void ConfigureOpenIdConnect(OpenIdConnectOptions options, IConfiguration configuration)
    {
        options.Authority = $"https://{configuration["Auth0:Domain"]}";

        options.ClientId = configuration["Auth0:ClientId"];
        options.ClientSecret = configuration["Auth0:ClientSecret"];

        options.ResponseType = OpenIdConnectResponseType.CodeIdToken;
        options.ResponseMode = OpenIdConnectResponseMode.FormPost;

        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("offline_access");

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
    }
}