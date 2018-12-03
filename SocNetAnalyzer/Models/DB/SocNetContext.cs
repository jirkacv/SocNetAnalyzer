using Microsoft.EntityFrameworkCore;

namespace SocNetAnalyzer.Models.DB
{
    public class SocNetContext : DbContext
    {
        public SocNetContext(DbContextOptions<SocNetContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Dataset> Datasets { get; set; }
        public DbSet<SimpleConnection> SimpleConnections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SimpleConnection>()
                .HasIndex(e => e.Id1);
            modelBuilder.Entity<SimpleConnection>()
                .HasIndex(e => e.Id2);
            modelBuilder.Entity<SimpleConnection>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Dataset>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
        }
    }
}