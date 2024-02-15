using static Mixorama.Server.Controllers.CocktailsController;

namespace Mixorama.Server;

public static partial class Logging
{
    [LoggerMessage(LogLevel.Information, "Cocktail created")]
    public static partial void LogCocktailCreated(
        this ILogger logger, 
        [LogProperties] CreateCocktailRequest cocktail);
}