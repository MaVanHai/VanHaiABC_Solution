/*
* Sinh viên: Ma Văn Hải
* Mssv: 2123110001
* Ngày: 5-28-2026
* Phiên bản: 1.0
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/categories
        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.Categories
                .OrderBy(x => x.Name)
                .ToList();

            return Ok(categories);
        }

        // GET: api/categories/1
        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            var category = _context.Categories
                .FirstOrDefault(x => x.Id == id);

            if (category == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy danh mục"
                });
            }

            return Ok(category);
        }
    }
}