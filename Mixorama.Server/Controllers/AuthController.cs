using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
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
            RedirectUri = returnUrl,
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
             var accessToken = await HttpContext.GetTokenAsync("access_token");
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);

            Claim[] identityClaims = ((ClaimsIdentity)User.Identity).Claims.Select(c =>
                                new Claim(c.Type, c.Value)).ToArray();

            Claim[] permissionClaims = jwt.Claims.Where(c => c.Type == "permissions").Select(c =>
                                new Claim(c.Type, c.Value)).ToArray();

            Claim[] claims = [.. identityClaims, .. permissionClaims];

            UserResponse response = new(IsAuthenticated: true, claims);
            return Ok(response);
        }

        return Ok(new UserResponse(IsAuthenticated: false, Claims: Array.Empty<Claim>()));
    }

    public record class UserResponse(
        bool IsAuthenticated,
        IEnumerable<Claim> Claims);

    public record class Claim(
        string Type,
        string Value);

    [HttpGet("profile")]
    [Authorize]
    public IActionResult Profile()
    {
        var response = new ProfileResponse(
            Name: User?.Identity?.Name ?? "",
            EmailAddress: User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
            ProfileImage: User?.Claims.FirstOrDefault(c => c.Type == "picture")?.Value);

        return Ok(response);
    }

    public record class ProfileResponse(
        string? Name,
        string? EmailAddress,
        string? ProfileImage);

    [HttpGet("secret")]
    [Authorize]
    public ActionResult Secret()
    {
        return Ok(new
        {
            Message = "Only authorized users should see this."
        });
    }
}
