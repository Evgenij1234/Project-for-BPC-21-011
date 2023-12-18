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
            var userToDelete = await db_people.Users.FirstOrDefaultAsync(u => u.nickname == nickname);

            if (userToDelete == null)
            {
                return NotFound("Пользователь не найден");
            }

            // Удаление связанных комментариев
            var userComments = await db_people.Comments.Where(c => c.UsersId == userToDelete.Id).ToListAsync();
            db_people.Comments.RemoveRange(userComments);

            // Удаление связанных постов
            var userPosts = await db_people.Posts.Where(p => p.UsersId == userToDelete.Id).ToListAsync();
            db_people.Posts.RemoveRange(userPosts);

            // Удаление пользователя
            db_people.Users.Remove(userToDelete);

            await db_people.SaveChangesAsync();

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