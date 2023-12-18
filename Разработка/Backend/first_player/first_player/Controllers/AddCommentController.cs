using first_player.Models;
using first_player.Services.ServicesContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddCommentController : ControllerBase
    {
        private ApplicationContext db_comment;

        public AddCommentController(ApplicationContext context)
        {
            db_comment = context;
        }

        [HttpPost("{postId}")]
        public async Task<IActionResult> AddComment( int postId)
        {
            var formData = HttpContext.Request.Form;
            string dateString = formData["datepublication"]; // Получаем строку из данных запроса
            DateTime? datepublication = DateTime.TryParse(dateString, out DateTime parsedDate) ? parsedDate : (DateTime?)null;
            try
            {
                var newComment = new Comments
                {
                    DatePublication = datepublication,
                    Text = formData["commentText"],
                    UsersId = int.TryParse(formData["userId"], out int userId) ? userId : 0, // Парсинг UsersId в int
                    PostsId = postId
                };

                db_comment.Comments.Add(newComment);
                await db_comment.SaveChangesAsync();

                return Ok(new { message = "Комментарий успешно добавлен" });
            }
            catch (Exception ex)
            {
                // Логирование ошибки или другие операции обработки ошибки
                return StatusCode(500, new { message = "Произошла ошибка при добавлении комментария", error = ex.Message });
            }
        }
        // вывод постов
        [HttpGet("{postId}")]
        public async Task<object> GetPostCommentst(int postId)
        {
            var comments = await db_comment.Comments
        .Where(comment => comment.PostsId == postId)
        .Select(comment => new
        {
            Comment = comment,
            CommentAuthor = new
            {
                Nickname = comment.User.nickname,
                ImagePath = comment.User.imagepath,
                UserId = comment.User.Id
            }
        })
        .ToListAsync();

            return comments;
        }
    }
}