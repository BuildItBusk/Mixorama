using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Mixorama.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : Controller
{
    [HttpGet("login")]
    public ActionResult Login(string returnUrl = "/")
    {
        return new ChallengeResult("Auth0", new AuthenticationProperties()
        {
            RedirectUri = returnUrl
        });
    }

    [Authorize]
    [HttpGet("logout")]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync();

        return new SignOutResult("Auth0", new AuthenticationProperties
        {
            RedirectUri = Url.Action("Index", "Home")
        });
    }

    [HttpGet("user")]
    public async Task<ActionResult> GetUser()
    {
        if (User.Identity?.IsAuthenticated ?? false)
        {
            var token = await HttpContext.GetTokenAsync("access_token");

            var claims = ((ClaimsIdentity)User.Identity).Claims.Select(c =>
                            new { type = c.Type, value = c.Value })
                            .ToArray();

            return Json(new { isAuthenticated = true, claims });
        }

        return Json(new { isAuthenticated = false });
    }
}
