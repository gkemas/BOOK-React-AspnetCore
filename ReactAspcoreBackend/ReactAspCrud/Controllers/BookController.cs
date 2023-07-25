using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookDbContext;
        public BookController(BookDbContext bookDbContext)
        {
            _bookDbContext = bookDbContext;
        }
        [HttpGet]
        [Route("GetBook")]
        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _bookDbContext.Book.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            if(_bookDbContext.Book == null)
            {
                return NotFound();
            }
            var book = await _bookDbContext.Book.FindAsync(id);
            if(book == null)
            {
                return NotFound();
            }
            return book;
        }
        [HttpPost]
        [Route("AddBook")]
        public async Task<Book> AddBook(Book objStudent)
        {
            _bookDbContext.Book.Add(objStudent);
            await _bookDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch]
        [Route("UpdateBook/{id}" )]
        public async Task<Book> UpdateBook(Book objStudent)
        {
            _bookDbContext.Entry(objStudent).State = EntityState.Modified;
            await _bookDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpDelete]
        [Route("DeleteBook/{id}")]
        public bool DeleteBook(int id)
        {
            bool a = false;
            var student = _bookDbContext.Book.Find(id);
            if (student != null)
            {
                a = true;
                _bookDbContext.Entry(student).State = EntityState.Deleted;
                _bookDbContext.SaveChanges();

            }
            else
            {
                a = false;
            }

            return a;
        }
    }

}
