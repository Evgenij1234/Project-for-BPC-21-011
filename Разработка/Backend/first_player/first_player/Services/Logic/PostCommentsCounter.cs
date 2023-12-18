using System.Linq;
using System.Threading.Tasks;
using first_player.Models;
using first_player.Services.ServicesContext;
using Microsoft.EntityFrameworkCore;

namespace first_player.Services.Logic
{
    public class PostCommentsCounter
    {
        private readonly ApplicationContext _dbContext;

        public PostCommentsCounter(ApplicationContext context)
        {
            _dbContext = context;
        }

        public async Task UpdateAllPostsCommentsCount()
        {
            // Получение всех постов из базы данных
            var allPosts = await _dbContext.Posts.ToListAsync();

            foreach (var post in allPosts)
            {
                // Подсчет количества комментариев для каждого поста
                int commentsCount = await _dbContext.Comments.CountAsync(c => c.PostsId == post.Id);

                // Обновление количества комментариев для текущего поста
                post.postcomments = commentsCount;
            }

            // Сохранение изменений в базе данных
            await _dbContext.SaveChangesAsync();
        }
    }
}