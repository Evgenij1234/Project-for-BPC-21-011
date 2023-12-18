using System.ComponentModel.DataAnnotations;

namespace first_player.Models
{
    public class Users
    {
        [Key]
        public int? Id { get; set; }
        public string? email { get; set; }
        public string? nickname { get; set; }
        public byte[]? imagepath { get; set; }
        public string? passwords { get; set; }
        public DateTime? createtime { get; set; }  
        public virtual ICollection <Posts>? Posts { get; set; }
        public byte[] DefaultImage => imagepath ?? GetDefaultImage();

        private byte[] GetDefaultImage()
        {
            // Путь к файлу
            string file_path = $"{Directory.GetCurrentDirectory()}\\Services\\img\\Без названия.jpg";
            var defaultImageBytes = File.ReadAllBytes(file_path);
            return defaultImageBytes;
        }
    }
}
