using Microsoft.EntityFrameworkCore;
using first_player.Models;
namespace first_player.Services.ServicesContext
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Posts> Posts { get; set; } = null!;
        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Comments> Comments { get; set; } = null!;
        public DbSet<clientIP> clientIP { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            
        }
        
    }
}
