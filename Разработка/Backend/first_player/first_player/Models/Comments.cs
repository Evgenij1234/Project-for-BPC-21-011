using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace first_player.Models
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }

        public DateTime? DatePublication { get; set; }

        public string? Text { get; set; }

        public int UsersId { get; set; }

        [ForeignKey("UsersId")]
        public virtual Users? User { get; set; }

        public int PostsId { get; set; }

        [ForeignKey("PostsId")]
        public virtual Posts? Post { get; set; }
    }
}
