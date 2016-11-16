using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

using WebAPIHW.Models;

namespace WebAPIHW.Controllers
{
    public class ApiBooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        public IQueryable<TDOBookandTypeandAuthor> TDO( IQueryable<Book> books ) {

            var books_types = books.Join(db.BookTypes,
          p => p.BookTypeId,
          c => c.BookTypeId,
          (p, c) => new TDOBookandType
          {
              Id = p.BookId,
              Name = p.Name,
              Age = p.Age,
              Book_Type = c.Genre,
              Publication = p.Publication,
              AuthorId = p.AuthorId
          });

            var books_types_authors = books_types.Join(db.Authors,
                 p => p.AuthorId,
                c => c.AuthorId,
                 (p, c) => new TDOBookandTypeandAuthor
                 {
                     Id = p.Id,
                     Age = p.Age,
                     Book_Type = p.Book_Type,
                     Name = p.Name,
                     Publication = p.Publication,
                     Author_Name = c.Name
                 });

            return books_types_authors;
        }

        // GET: api/ApiBooks
        public IQueryable<Book> GetBooks()
        {
            return db.Books;
        }

        // GET: api/ApiBooks/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBookById(int id)
        {
            var book = db.Books.Where(x =>x.BookId ==id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(TDO(book));
        }

        // PUT: api/ApiBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, [FromBody] Book book)
        {            
            Book oldBook = db.Books.FirstOrDefault(x => x.BookId == id);

            oldBook.Age = book.Age;
            oldBook.Name = book.Name;
            oldBook.Publication = book.Publication;

            db.Entry(oldBook).State = EntityState.Modified;
            db.SaveChanges();
            return Ok(book);
        }
        

        // DELETE: api/ApiBooks/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        [HttpGet]
        public IQueryable<TDOBookandTypeandAuthor> BooksFullInfo()
        {
            var books = db.Books;           

            return TDO(books);
        }
        //Api/{controller}/{action}
        
        // GET api/values/BookTypeId
        [HttpGet]
        public IEnumerable<TDOBookandTypeandAuthor> BooksFullInfo(int id)
        {

            //var control = db.Books.FirstOrDefault(x => x.BookTypeId == id);

            //var books = control==null? db.Books: db.Books.Where(x => x.BookTypeId == id);
            var books = db.Books.Where(x => x.BookTypeId == id);
            return TDO(books);
            
        }

        [HttpPost]
        //public HttpResponseMessage CreateBook([FromBody] TDOBookandTypeandAuthor item)
        public IHttpActionResult CreateBook([FromBody] TDOBookandTypeandAuthor item)
        {
            try
            {

                BookType bt = db.BookTypes.FirstOrDefault(x => x.Genre == item.Book_Type);
                if (bt == null)
                {
                    throw new System.InvalidOperationException("Genre not Found");
                }
                
                Author au = new Author();             
                Book b = new Book();
              
                au.Name = item.Author_Name;
                db.Authors.Add(au);
                db.SaveChanges();

               

                b.Age = item.Age;
                b.AuthorId = au.AuthorId;
                b.BookTypeId = bt.BookTypeId;
                b.Name = item.Name;
                b.Publication = item.Publication;
                db.Books.Add(b);
                db.SaveChanges();
                item.Id = b.BookId;
                // return Request.CreateResponse(HttpStatusCode.OK);
                return Ok(item);
            }
            catch (Exception ex)
            {
                //return Request.CreateResponse(HttpStatusCode.BadRequest, item);
                return NotFound();
            }
            
        }

        public List<BookType> GetGenres()
        {
            return db.BookTypes.ToList();
        }

    }
}