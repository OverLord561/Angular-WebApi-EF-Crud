using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPIHW.Models
{
    public class BookType
    {
        public int BookTypeId { get; set; }
        public string Genre { get; set; }     

        public List<Book> Books { get; set; }
    }
}