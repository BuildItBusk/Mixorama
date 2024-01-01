using static Mixorama.Server.Controllers.CocktailsController;

public static partial class Logging
{
    [LoggerMessage(LogLevel.Information, "Cocktail created")]
    public static partial void LogCocktailCreated(
        this ILogger logger, 
        [LogProperties] Cocktail cocktail);
}