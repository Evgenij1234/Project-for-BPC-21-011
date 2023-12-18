using System.ComponentModel.DataAnnotations;

namespace first_player.Models
{
    public class clientIP
    {
        [Key]
        public int Id { get; set; }
        public string? IP_user { get; set; }
    }
}
