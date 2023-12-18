using first_player.Models;
using first_player.Services;
using first_player.Services.ServicesContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using first_player.Services;
using first_player.Services.Logic;

namespace first_player.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private ApplicationContext db_posts;
        private ApplicationContext db_ip;
        public PostsController(ApplicationContext context)
        {
            db_posts = context;
            db_ip = context;
        }


        // вывод постов
        [HttpGet]
        public async Task<object> Textoutput()
        {
            var postCommentsCounter = new PostCommentsCounter(db_posts);
            await postCommentsCounter.UpdateAllPostsCommentsCount();
            string IP = HttpContext.Connection.RemoteIpAddress.ToString();
            var posts = await db_posts.Posts.ToListAsync();
            var ipExists = await db_ip.clientIP.AnyAsync(c => c.IP_user == IP);
            if (!ipExists && IP != null)
            {
                foreach (var post in posts)
                {
                    post.postviews++; // Увеличиваем значение поля на 1
                }

                await db_posts.SaveChangesAsync();

                var clientIP = new clientIP
                {
                    IP_user = IP
                };

                db_ip.clientIP.Add(clientIP);
                await db_ip.SaveChangesAsync();
            }
            var result = db_posts.Posts.Select(posts => new
            {
                posts = posts,
                PostAutors = posts.Users.nickname,
                AutorsImg = posts.Users.imagepath,
                AutorsId = posts.Users.Id
            });
            return await result.ToListAsync();
        }


        // ввод постов
        [HttpPost]
        public async Task<IActionResult> AddPost()
        {
            var formData = HttpContext.Request.Form;

            string dateString = formData["datepublication"]; // Получаем строку из данных запроса
            DateTime? datepublication = DateTime.TryParse(dateString, out DateTime parsedDate) ? parsedDate : (DateTime?)null;
            // Создание нового поста на основе полученных данных
            var newPost = new Posts
            {
                datepublication = datepublication,
                topic = formData["topic"],
                posttext = formData["posttext"],
                imgformat = formData["imgformat"],
                imgpost = await ConvertFileToByteArray(formData.Files["imgpost"]),
                postteg = formData["postteg"],
                postrating = 0,
                postviews = 1,
                postcomments = 0,
                UsersId = int.TryParse(formData["usersId"], out int userId) ? userId : 0 // Парсинг UsersId в int
            };

            db_posts.Posts.Add(newPost);
            await db_posts.SaveChangesAsync();

            return Ok(new { message = "Пост успешно добавлен", postId = newPost.Id });
        }

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
        //получаем 1 пост
        [HttpGet("{postId}")]
        public IActionResult GetPost(int postId)
        {
            var post = db_posts.Posts
            .Where(p => p.Id == postId)
            .Select(post => new
            {
            posts = post,
            PostAutors = post.Users.nickname,
            AutorsImg = post.Users.imagepath,
            AutorsId = post.Users.Id
            })
            .FirstOrDefault();
            if (post == null)
            {
                return NotFound(new { message = "Пост не найден" });
            }

            return Ok(post);
        }

        [HttpPut] 
        public async Task<IActionResult> LikeOrDislike(int postId, int increment)
        {
            
            var post = await db_posts.Posts.FindAsync(postId);

            if (post == null)
            {
                return NotFound(); // Пост не найден
            }

            post.postrating += increment; // Добавление или удаление лайков в зависимости от increment

            try
            {
                await db_posts.SaveChangesAsync();
                return Ok(post.postrating); // Возвращаем количество лайков после изменения
            }
            catch (DbUpdateException)
            {
                return StatusCode(500); // Обработка ошибки сохранения изменений
            }
        }
    }
}
