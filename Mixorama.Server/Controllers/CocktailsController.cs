using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mixorama.Server.Database;
using Mixorama.Server.Infrastructure;

namespace Mixorama.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CocktailsController : ControllerBase
{
    private readonly ILogger<CocktailsController> _logger;
    private readonly CocktailContext _db;

    public CocktailsController(ILogger<CocktailsController> logger, CocktailContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Cocktail>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCocktails()
    {
        var cocktails =  _db.Cocktails.Include(c => c.Ingredients);
        List<Cocktail> result = await cocktails.Select(c => new Cocktail
        {
            Name = c.Name,
            Description = c.Description,
            ImageUrl = c.ImageUrl,
            Ingredients = c.Ingredients.Select(i => new Ingredient
            (
                i.Name,
                i.Quantity,
                i.Unit
            ))
        }).ToListAsync();
        
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
        CocktailEntity entity = new()
        {
            Name = request.Name,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            Ingredients = request.Ingredients.Select(i => new IngredientEntity
            {
                Name = i.Name,
                Quantity = i.Quantity,
                Unit = i.Unit
            }).ToList()
        };

        try 
        {   
            await _db.Cocktails.AddAsync(entity);
            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create cocktail");
            return Problem("Failed to create cocktail", statusCode: StatusCodes.Status500InternalServerError);
        }
        

        return CreatedAtAction(nameof(GetCocktail), new { name = request.Name }, request);
    }

    [HttpGet("{name}")]
    [ProducesResponseType(typeof(Cocktail), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCocktail(string name)
    {
    CocktailEntity? cocktail = await _db.Cocktails
        .Where(c => EF.Functions.Like(c.Name, $"{name}"))
        .Include(c => c.Ingredients)
        .FirstOrDefaultAsync();
        
        if (cocktail is null)
        {
            return NotFound();
        }

        Cocktail result = new()
        {
            Name = cocktail.Name,
            Description = cocktail.Description,
            ImageUrl = cocktail.ImageUrl,
            Ingredients = cocktail.Ingredients.Select(i => new Ingredient
            (
                i.Name,
                i.Quantity,
                i.Unit
            ))
        };

        return Ok(result);
    }

    public class Cocktail()
    {
        public string Name { get; init; } = default!;
        public string Description { get; init; } = default!;
        public string ImageUrl { get; init; } = default!;
        public IEnumerable<Ingredient> Ingredients { get; init; } = default!;
    }

    public record CreateCocktailRequest(
        string Name,  
        string Description, 
        string ImageUrl,
        IEnumerable<Ingredient> Ingredients);

    public record Ingredient(
        string Name,
        string Quantity,
        string Unit);
}