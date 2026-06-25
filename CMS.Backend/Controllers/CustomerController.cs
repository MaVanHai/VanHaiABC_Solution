/*
*Sinh viên: Ma Văn Hải
*Mssv: 2123110001
*Ngày: 5-28-2026
*Phiên bản: 1.0
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.Customers.ToList();
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Customer model, string Password)
        {
            if (ModelState.IsValid)
            {
                var checkEmail = _context.Customers.Any(x => x.Email == model.Email);

                if (checkEmail)
                {
                    ModelState.AddModelError(
                        "Email",
                        "Email đã tồn tại"
                    );

                    return View(model);
                }

                if (string.IsNullOrWhiteSpace(Password))
                {
                    ModelState.AddModelError(
                        "Password",
                        "Vui lòng nhập mật khẩu"
                    );

                    return View(model);
                }

                // Lưu mật khẩu thô giống API
                model.Password = Password;

                _context.Customers.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
                return NotFound();

            return View(customer);
        }

        [HttpPost]
        public IActionResult Edit(Customer model, string Password)
        {
            var existing = _context.Customers.Find(model.Id);

            if (existing == null)
                return NotFound();

            var checkEmail = _context.Customers.Any(
                x => x.Email == model.Email &&
                     x.Id != model.Id
            );

            if (checkEmail)
            {
                ModelState.AddModelError(
                    "Email",
                    "Email đã tồn tại"
                );

                return View(model);
            }

            existing.FullName = model.FullName;
            existing.Email = model.Email;
            existing.Phone = model.Phone;
            existing.Address = model.Address;

            // Nếu nhập mật khẩu mới thì cập nhật
            if (!string.IsNullOrWhiteSpace(Password))
            {
                existing.Password = Password;
            }

            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}