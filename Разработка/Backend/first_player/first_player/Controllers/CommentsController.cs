using first_player.Models;
using first_player.Services.Logic;
using first_player.Services.ServicesContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : ControllerBase
    {
        private ApplicationContext db_comment;
        public CommentsController(ApplicationContext context)
        {
            db_comment = context;
        }

        // вывод комментов
        [HttpGet]
        public async Task<object> Textoutput()
        {
            var result = db_comment.Comments.Select(comment => new
            {
                comment = comment,
                commentAutors = comment.User.nickname,
                imageAutor = comment.User.imagepath
            });
            return await result.ToListAsync();
        }
        // ввод комментов
        [HttpPost]
        public async Task<IActionResult> AddPost()
        {
            var formData = HttpContext.Request.Form;
            string dateString = formData["datepublication"]; // Получаем строку из данных запроса
            DateTime? DatePublication = DateTime.TryParse(dateString, out DateTime parsedDate) ? parsedDate : (DateTime?)null;

            // Создание новый коммента на основе полученных данных
            var newComment = new Comments
            {
                DatePublication = DatePublication,
                Text = formData["text"],
                PostsId = int.TryParse(formData["postsId"], out int postsId) ? postsId : 0, // Парсинг Id в int
                UsersId = int.TryParse(formData["usersId"], out int userId) ? userId : 0 // Парсинг Id в int
            };
            db_comment.Comments.Add(newComment);
            await db_comment.SaveChangesAsync();
            return Ok(new { message = "Комментарий успешно добавлен", commentId = newComment.Id });
        }
    }
}
