using Microsoft.AspNetCore.Mvc;
using first_player.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using first_player.Services.JWT;
using Microsoft.AspNetCore.Authorization;
using first_player.Services.ServicesContext;
using Microsoft.EntityFrameworkCore;


namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private ApplicationContext db_people;
        public RegistrationController(ApplicationContext context)
        {
            db_people = context;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Users user, ApplicationContext db)
        {
            //Проверка на заполненость полей ввода
            if(user.passwords is null || user.email is null || user.nickname is null) return BadRequest("Не указан логин, пароль или никнейм");
            //Проверки на такие же значения у других
            Users? useremail = await db.Users.FirstOrDefaultAsync(u => u.email == user.email);
            Users? userlogin = await db.Users.FirstOrDefaultAsync(u => u.nickname == user.nickname);
            if (useremail != null) {
                return BadRequest("Такой емайл уже зарегистрирован");
                
            }
            else if (userlogin != null)
            {
                return BadRequest("Пользователь с такой почтой уже есть");
            }
            else
            {
                user.imagepath = user.DefaultImage;
                await db.Users.AddAsync(user);
                await db.SaveChangesAsync();
                ClasToken tokenuser = new ClasToken(db_people);
                return  Ok(tokenuser.Login(user));
            }
        }
    }
}
