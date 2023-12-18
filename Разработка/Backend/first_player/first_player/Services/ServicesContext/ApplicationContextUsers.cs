using Microsoft.EntityFrameworkCore;
using first_player.Models;
namespace first_player.Services.ServicesContext
{
    public class ApplicationContextUsers : DbContext
    {
        public DbSet<Users> Users { get; set; } = null!;

        public ApplicationContextUsers(DbContextOptions<ApplicationContextUsers> options)
            : base(options)
        {

        }

    }
}
