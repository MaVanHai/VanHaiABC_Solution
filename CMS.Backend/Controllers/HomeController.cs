using System.Diagnostics;
using CMS.Backend.Models;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // LINQ: L?y 3 bài vi?t m?i nh?t
            var latestPosts = _context.Posts
                .Include(p => p.Category) // L?y kèm thông tin Danh m?c (Join b?ng)
                .OrderByDescending(p => p.CreatedDate) // S?p x?p theo ngày t?o m?i nh?t    
                .Take(3) // L?y 3 bài vi?t ??u tiên sau khi ?ã s?p x?p (t?c là 3 bài m?i nh?t)
                .ToList();// Chuy?n k?t qu? thành List ?? truy?n sang View

            return View(latestPosts);
        }

    }
}