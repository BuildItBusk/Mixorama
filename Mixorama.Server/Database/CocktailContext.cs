using Microsoft.EntityFrameworkCore;

namespace Mixorama.Server.Database;

public class CocktailContext(DbContextOptions<CocktailContext> options) : DbContext(options)
{
    public DbSet<CocktailEntity> Cocktails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CocktailEntity>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity
                .HasMany(c => c.Ingredients)
                .WithOne()
                .HasForeignKey(i => i.CocktailId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<IngredientEntity>(entity =>
        {
            entity.HasKey(i => i.Id);
        });
    }
}