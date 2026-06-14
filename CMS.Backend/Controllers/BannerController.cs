using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    /*
    * Sinh viên: Ma Văn Hải
    * Mssv: 2123110001
    * Ngày: 5-28-2026
    * Phiên bản: 1.0
    */

    public class BannerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BannerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // LIST
        public async Task<IActionResult> Index()
        {
            var data = await _context.Banners
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            return View(data);
        }

        // CREATE - GET
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // CREATE - POST
        [HttpPost]
        public async Task<IActionResult> Create(Banner model, IFormFile uploadImage)
        {
            if (!ModelState.IsValid)
                return View(model);

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads",
                    "banners");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                model.ImageUrl = "/uploads/banners/" + fileName;
            }

            _context.Banners.Add(model);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        // DELETE
        public async Task<IActionResult> Delete(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner != null)
            {
                _context.Banners.Remove(banner);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        // EDIT - GET
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner == null)
                return NotFound();

            return View(banner);
        }

        // EDIT - POST
        [HttpPost]
        public async Task<IActionResult> Edit(Banner model, IFormFile uploadImage)
        {
            if (!ModelState.IsValid)
                return View(model);

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads",
                    "banners");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                model.ImageUrl = "/uploads/banners/" + fileName;
            }
            else
            {
                var old = await _context.Banners.FirstOrDefaultAsync(x => x.Id == model.Id);
                if (old != null)
                    model.ImageUrl = old.ImageUrl;
            }

            _context.Banners.Update(model);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}