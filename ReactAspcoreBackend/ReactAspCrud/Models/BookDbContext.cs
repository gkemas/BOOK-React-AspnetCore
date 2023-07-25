using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Models
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions <BookDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Book { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localDb)\\Gökhan;database=Book;Trusted_connection=true ");
        }
    }
}
