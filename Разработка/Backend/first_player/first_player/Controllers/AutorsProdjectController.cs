using Microsoft.AspNetCore.Mvc;
namespace first_player.Controllers;

[ApiController]
[Route("[controller]")]
public class AutorsProdjectController : ControllerBase
{
    //Метод считывает данные из файла.
    static public async Task<string> Reade(string URL)
    {
        string render;
        using (StreamReader reader = new StreamReader(URL))
        {
            string text = await reader.ReadToEndAsync();
            render = text;
        }
        return render;
    }

    //Метод находит файл в файлах и выводит данные из файла
    [HttpGet]
    public async Task<string> Textoutput()
    {
        string path = $"{Directory.GetCurrentDirectory()}\\Lyrics\\Autors.txt";
        return await Reade(path);
    }
}
