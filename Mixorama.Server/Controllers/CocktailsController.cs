using Microsoft.AspNetCore.Mvc;

namespace Mixorama.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CocktailsController : ControllerBase
{
    private readonly ILogger<CocktailsController> _logger;

    public CocktailsController(ILogger<CocktailsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetCocktails()
    {
        _logger.LogInformation("Getting cocktails");
        var result = Cocktails;
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCocktail(Cocktail cocktail)
    {
        _logger.LogInformation($"Creating cocktail {cocktail.Name}");
        return CreatedAtAction(nameof(GetCocktail), new { name = cocktail.Name }, cocktail);
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> GetCocktail(string name)
    {
        _logger.LogInformation($"Getting cocktail {name}");
        var result = Cocktails.FirstOrDefault(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    private static List<Cocktail> Cocktails =>
        [
            new("Mojito", "A refreshing Cuban highball", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Classic_mojito.jpg/800px-Classic_mojito.jpg"),
            new("Margarita", "A cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/MargaritaReal.jpg/800px-MargaritaReal.jpg"),
            new("Cosmopolitan", "A cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cosmopolitan_%28Cocktail%29.jpg/800px-Cosmopolitan_%28Cocktail%29.jpg"),
            new("Mai Tai", "A cocktail based on rum, Curaçao liqueur, orgeat syrup, and lime juice, associated with Polynesian-style settings", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mai_Tai_%28Original%29.jpg/800px-Mai_Tai_%28Original%29.jpg"),
            new("Pina Colada", "A sweet cocktail made with rum, coconut cream or coconut milk, and pineapple juice, usually served either blended or shaken with ice", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pi%C3%B1a_Colada_%283949902937%29.jpg/800px-Pi%C3%B1a_Colada_%283949902937%29.jpg"),
            new("Long Island Iced Tea", "A type of alcoholic mixed drink typically made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, which gives the drink the same amber hue as its namesake", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Long_Island_Iced_Tea_%28aka%29.jpg/800px-Long_Island_Iced_Tea_%28aka%29.jpg")
        ];

    public record Cocktail(string Name, string Description, string ImageUrl);
}