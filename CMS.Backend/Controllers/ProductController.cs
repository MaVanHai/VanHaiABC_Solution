/*
*Sinh viên: Ma Văn Hải
*Mssv: 2123110001
*Ngày: 5-28-2026
*Phiên bản: 1.0
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace CMS.Backend.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.Products.ToList();
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryProducts = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name"
            );

            return View();
        }

        [HttpPost]
        public IActionResult Create(Product model, IFormFile uploadImage)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.CategoryProducts = new SelectList(
                    _context.CategoriesProducts.ToList(),
                    "Id",
                    "Name"
                );

                return View(model);
            }

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads",
                    "products");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() +
                                 Path.GetExtension(uploadImage.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/products/" + fileName;
            }

            _context.Products.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound();

            ViewBag.CategoryProducts = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                product.CategoryProductId
            );

            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product model, IFormFile uploadImage)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.CategoryProducts = new SelectList(
                    _context.CategoriesProducts.ToList(),
                    "Id",
                    "Name",
                    model.CategoryProductId
                );

                return View(model);
            }

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads",
                    "products");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() +
                                 Path.GetExtension(uploadImage.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/products/" + fileName;
            }
            else
            {
                var oldProduct = _context.Products
                    .FirstOrDefault(x => x.Id == model.Id);

                if (oldProduct != null)
                {
                    model.ImageUrl = oldProduct.ImageUrl;
                }
            }

            _context.Products.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}