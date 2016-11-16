using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPIHW.Models
{
    public class TDOBookandType
    {
        public int Id { get; set; }

       public string Name { get; set; }

        public int Age { get; set; }

        public string Publication { get; set; }

        public string Book_Type { get; set; }

        public int AuthorId { get; set; }


    }
}