using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;

namespace first_player.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UnloadingMobileController : ControllerBase
    {
        [HttpGet]
        public FileResult Unloading()
        {
            // Путь к файлу
            string file_path = $"{Directory.GetCurrentDirectory()}\\MobileApk\\1626856022_durak_devona_231.apk";
            // Тип файла - content-type
            string file_type = "application/apk";
            // Имя файла - необязательно
            string file_name = "1626856022_durak_devona_231.apk";
            return File(file_path, file_type, file_name);
        }
    }
}
