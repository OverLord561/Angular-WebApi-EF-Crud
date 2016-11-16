using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPIHW.Models
{
        public class Book
        {
            public int BookId { get; set; }
            public int Age { get; set; }
            public string Publication { get; set; }
            public string Name { get; set; }

            [ForeignKey("BookType")]
            public int BookTypeId { get; set; }
            public BookType BookType { get; set; }

            [ForeignKey("Author")]
            public int AuthorId { get; set; }
            public Author Author { get; set; }

        }
    
}