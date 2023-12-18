using Microsoft.AspNetCore.Mvc;
using first_player.Models;
using first_player.Services.ServicesContext;
using first_player.Services.JWT;
using Microsoft.EntityFrameworkCore;

namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private ApplicationContext db_people;
        public LoginController(ApplicationContext context)
        {
            db_people = context;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Users user, ApplicationContext db)
        {
            Users? userindex = await db.Users.FirstOrDefaultAsync(u => u.email == user.email && u.passwords == user.passwords);
            // если пользователя нет в базе, ошибка
            if (userindex is null)
            {
                return BadRequest("Неверный емайл или пороль");

            }
            else 
            {
                ClasToken tokenuser = new ClasToken(db_people);
                return Ok(tokenuser.Login(user));
            }
        }
    }
}
