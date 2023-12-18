using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace first_player.Models
{
    public class Posts
    {
        [Key]
        public int Id { get; set; }
        public DateTime? datepublication { get; set; }
        public string? topic { get; set; }
        public string? posttext { get; set; }
        public byte[]? imgpost { get; set; }
        public string? imgformat { get; set; }
        public string? postteg { get; set; }
        public int? postrating { get; set; }
        public int? postviews { get; set; }
        public int? postcomments { get; set; }
        public virtual ICollection<Comments>? Comments { get; set; }
        public int? UsersId { get; set; }
        public virtual Users? Users { get; set; }

    }
}
