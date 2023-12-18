using Microsoft.AspNetCore.Mvc;
using first_player.Models;
using first_player.Services.ServicesContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.IO;
using first_player.Services.JWT;

namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonaldataController : ControllerBase
    {
        private readonly ApplicationContext db_people;

        public PersonaldataController(ApplicationContext context)
        {
            db_people = context;
        }

        [HttpPost]
        public async Task<IActionResult> UpsertUser()
        {
            var formData = HttpContext.Request.Form;
            // Получение данных из формы
            string email = formData["email"];
            string passwords = formData["passwords"];
            byte[] imagepath = await ConvertFileToByteArray(formData.Files["imagepath"]);
            string nickname = formData["nickname"];
            int? Id = null;
            if (int.TryParse(formData["userId"], out int parsedId))
            {
                Id = parsedId;
            }


            var existingUser = await db_people.Users.FirstOrDefaultAsync(u => u.Id == Id);
            // Добавление данных пользователя в БД
            var newUser = new Users
            {
                email = formData["email"],
                nickname = formData["nickname"],
                imagepath = await ConvertFileToByteArray(formData.Files["imagepath"]),
                passwords = formData["passwords"],
                Id = int.Parse(formData["userId"])
            };
            //Проверка на заполненость полей ввода
            if (newUser.passwords == "" || newUser.email == "" || newUser.nickname == "") return BadRequest("Не указан логин, пароль или никнейм");
            //Проверки на такие же значения у других
            Users? useremail = await db_people.Users.FirstOrDefaultAsync(u => u.email == newUser.email && u.Id != newUser.Id);
            Users? userlogin = await db_people.Users.FirstOrDefaultAsync(u => u.nickname == newUser.nickname && u.Id != newUser.Id);
            if (useremail != null)
            {
                return BadRequest("Такой емайл уже зарегистрирован");

            }
            else if (userlogin != null)
            {
                return BadRequest("Пользователь с таким ником уже есть");
            }
            else
            {
                existingUser.email = newUser.email;
                existingUser.passwords = newUser.passwords;
                existingUser.imagepath = newUser.imagepath;
                existingUser.nickname = newUser.nickname;
                await db_people.SaveChangesAsync();
                ClasToken tokenuser = new ClasToken(db_people);
                return Ok(tokenuser.Login(newUser));
            }
            
        }



        //Парсим картинку в байты
        private async Task<byte[]> ConvertFileToByteArray(IFormFile? file)
        {
            if (file == null)
            {
                // Обработка случая, когда file равен null
                return null; // Или другое подходящее действие в зависимости от логики вашего приложения
            }
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }



    }
}







