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
    public class AdminController : ControllerBase
    {
        private readonly ApplicationContext db_people;

        public AdminController(ApplicationContext context)
        {
            db_people = context;
        }

        [HttpDelete("{nickname}")]
        public async Task<IActionResult> Delete(string nickname)
        {
            var userToDelete = db_people.Users.FirstOrDefault(u => u.nickname == nickname);

            if (userToDelete == null)
            {
                return NotFound("Пользователь не найден");
            }

            // Удаление связанных комментариев
            var userComments =  db_people.Comments.Where(c => c.UsersId == userToDelete.Id).ToList();
            if(userComments != null)
            {
                db_people.Comments.RemoveRange(userComments);
                db_people.SaveChanges();
            }
            // Удаление связанных постов
            var userPosts =  db_people.Posts.Where(p => p.UsersId == userToDelete.Id).ToList();
            foreach (var post in userPosts)
            {
                // Найти все комментарии, принадлежащие этому посту
                var postComments = db_people.Comments.Where(c => c.PostsId == post.Id).ToList();
                if (postComments != null)
                {
                    db_people.Comments.RemoveRange(postComments);
                }
            }
            if (userPosts != null)
            {
                db_people.Posts.RemoveRange(userPosts);
                db_people.SaveChanges();
            }
            // Удаление пользователя
            db_people.Users.RemoveRange(userToDelete);
            db_people.SaveChanges();

            return Ok("Пользователь успешно удален");
        }

        [HttpGet]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var usersCount = await db_people.Users.CountAsync();
                var postsCount = await db_people.Posts.CountAsync();
                var commentsCount = await db_people.Comments.CountAsync();

                return Ok(new
                {
                    UsersCount = usersCount,
                    PostsCount = postsCount,
                    CommentsCount = commentsCount
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}