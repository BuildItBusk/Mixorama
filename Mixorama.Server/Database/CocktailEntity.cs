namespace Mixorama.Server.Database;

public class CocktailEntity
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
    public string ImageUrl { get; init; }
    public ICollection<IngredientEntity> Ingredients { get; init; }  = [];
}

public class IngredientEntity
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Quantity { get; init; }
    public string Unit { get; init; }
    public int CocktailId { get; init; }
}