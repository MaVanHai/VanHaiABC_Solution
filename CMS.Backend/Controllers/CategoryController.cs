/*
*Sinh viên: Ma Văn Hải
*Mssv: 2123110001
*Ngày: 5-24-2026
*Phiên bản: 1.0
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Inject DbContext
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Danh sách Category
        public IActionResult Index()
        {
            var data = _context.Categories.ToList();

            return View(data);
        }

        // GET: Hiển thị form thêm mới
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Lưu dữ liệu vào database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Category model)
        {
            // Kiểm tra dữ liệu hợp lệ
            if (ModelState.IsValid)
            {
                _context.Categories.Add(model);

                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }
            var errors = ModelState.Values
        .SelectMany(v => v.Errors);
            return View(model);
        }
        public IActionResult Delete(int id)
        {
            // Bước 1: Tìm đối tượng danh mục trong Database bằng Id
            var category = _context.Categories.Find(id);

            // Kiểm tra nếu tìm thấy thì mới xóa
            if (category != null)
            {
                // Bước 2: Lệnh xóa khỏi bộ nhớ tạm (Tracking)
                _context.Categories.Remove(category);

                // Bước 3: Chốt phiên làm việc, xóa thực sự trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi xóa xong, quay lại trang danh sách để cập nhật giao diện
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Category model)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Update(model);

                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(model);
        }
    }
}