using Microsoft.AspNetCore.Mvc;
using Mixorama.Server.Infrastructure;

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
    [ProducesResponseType(typeof(IEnumerable<Cocktail>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCocktails()
    {
        _logger.LogInformation("Getting cocktails");
        var result = Cocktails;
        return Ok(result);
    }

    [HttpPost("images")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Image is null or empty.");

        string directory =  "Images";

        if (!Directory.Exists(directory))
            Directory.CreateDirectory(directory);

        string fileName = Path.GetRandomFileName();
        fileName = Path.ChangeExtension(fileName, image.FileName.Split('.').Last());

        string relativeUrl = $"{directory}/{fileName}";
        using Stream fileStream = image.OpenReadStream();

        if (fileStream.Length > 1024 * 1024 * 1) // 1 MB
            return BadRequest("Maximum image size is 1 MB.");

        BlobStorage blobStorage = new();
        await blobStorage.UploadFile(fileStream, fileName);

        return Ok(new { RelativeUrl = relativeUrl});
    }

    [HttpPost]
    [ProducesResponseType(typeof(Cocktail), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateCocktail(CreateCocktailRequest request)
    {
        // TODO: Actually add the cocktail to the database
        _logger.LogCocktailCreated(request);
        return CreatedAtAction(nameof(GetCocktail), new { name = request.Name }, request);
    }

    [HttpGet("{name}")]
    [ProducesResponseType(typeof(Cocktail), StatusCodes.Status200OK)]
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
            new Cocktail
            {
                Name = "Mojito",
                Description = "A refreshing Cuban highball",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Mojito_-_Three_Ingredients_%281%29.jpg/800px-Mojito_-_Three_Ingredients_%281%29.jpg"
            },
            new Cocktail
            {
                Name = "Margarita",
                Description = "A cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/MargaritaReal.jpg/800px-MargaritaReal.jpg"
            },
            new Cocktail
            {
                Name = "Pina Colada",
                Description = "A sweet cocktail made with rum, cream of coconut or coconut milk, and pineapple juice, usually served either blended or shaken with ice",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pi%C3%B1a_Colada.jpg/800px-Pi%C3%B1a_Colada.jpg"
            },
            new Cocktail
            {
                Name = "Cosmopolitan",
                Description = "A cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cosmopolitan_%28345789642%29.jpg/800px-Cosmopolitan_%28345789642%29.jpg"
            },
            new Cocktail
            {
                Name = "Mai Tai",
                Description = "A cocktail based on rum, Curaçao liqueur, orgeat syrup, and lime juice, associated with Polynesian-style settings",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mai_Tai_%282%29.jpg/800px-Mai_Tai_%282%29.jpg"
            }
        ];

    public class Cocktail()
    {
        public string Name { get; init; } = default!;
        public string Description { get; init; } = default!;
        public string ImageUrl { get; init; } = default!;
    }

    public record CreateCocktailRequest(
        string Name,  
        string Description, 
        string ImageUrl,
        Ingredient[] Ingredients);

    public record Ingredient(
        string Name,
        string Quantity,
        string Unit);
}