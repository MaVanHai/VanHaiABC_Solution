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
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ================= DANH SÁCH =================
        public IActionResult Index(int id)
        {
            var data = _context.OrderDetails
                .Include(x => x.Order)
                .Include(x => x.Product)
                .Where(x => x.OrderId == id)
                .ToList();

            ViewBag.OrderId = id;

            return View(data);
        }

        // ================= CREATE GET =================
        [HttpGet]
        public IActionResult Create(int orderId)
        {
            ViewBag.Products = new SelectList(
                _context.Products,
                "Id",
                "Name"
            );

            var model = new OrderDetail
            {
                OrderId = orderId
            };

            return View(model);
        }

        // ================= CREATE POST =================
        [HttpPost]
        public IActionResult Create(OrderDetail model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Products = new SelectList(
                    _context.Products,
                    "Id",
                    "Name"
                );

                return View(model);
            }

            // Lấy giá sản phẩm tự động
            var product = _context.Products.Find(model.ProductId);

            if (product == null)
            {
                ModelState.AddModelError("", "Sản phẩm không tồn tại");

                ViewBag.Products = new SelectList(
                    _context.Products,
                    "Id",
                    "Name"
                );

                return View(model);
            }

            model.UnitPrice = product.Price;

            _context.OrderDetails.Add(model);

            _context.SaveChanges();

            return RedirectToAction("Index",
                new { id = model.OrderId });
        }

        // ================= EDIT GET =================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var orderDetail = _context.OrderDetails.Find(id);

            if (orderDetail == null)
                return NotFound();

            ViewBag.Products = new SelectList(
                _context.Products,
                "Id",
                "Name",
                orderDetail.ProductId
            );

            return View(orderDetail);
        }

        // ================= EDIT POST =================
        [HttpPost]
        public IActionResult Edit(OrderDetail model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Products = new SelectList(
                    _context.Products,
                    "Id",
                    "Name",
                    model.ProductId
                );

                return View(model);
            }

            var product = _context.Products.Find(model.ProductId);

            if (product != null)
            {
                model.UnitPrice = product.Price;
            }

            _context.OrderDetails.Update(model);

            _context.SaveChanges();

            return RedirectToAction("Index",
                new { id = model.OrderId });
        }

        // ================= DELETE =================
        public IActionResult Delete(int id)
        {
            var orderDetail = _context.OrderDetails.Find(id);

            if (orderDetail != null)
            {
                int orderId = orderDetail.OrderId;

                _context.OrderDetails.Remove(orderDetail);

                _context.SaveChanges();

                return RedirectToAction("Index",
                    new { id = orderId });
            }

            return RedirectToAction("Index");
        }
    }
}