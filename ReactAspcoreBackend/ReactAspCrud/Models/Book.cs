using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Models
{
    public class Book
    {
        [Key]
        public int id { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ISBN { get; set; }
        public bool Novel { get; set; }
        public bool Poetry { get; set; }
        public bool Biography { get; set; }
        public string Language { get; set; }
        public int Page { get; set; }
        public string Publisher { get; set; }



    }
}
