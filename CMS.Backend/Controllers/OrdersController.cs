using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================
        // TẠO ĐƠN HÀNG
        // POST: api/orders
        // ==========================
        [HttpPost]
        public async Task<IActionResult> CreateOrder(
            [FromBody] OrderInputDTO input)
        {
            if (
                input == null ||
                input.Items == null ||
                !input.Items.Any()
            )
            {
                return BadRequest(new
                {
                    message = "Giỏ hàng không hợp lệ"
                });
            }

            try
            {
                var order = new Order
                {
                    CustomerId = input.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0,
                    Notes = input.Notes
                };

                _context.Orders.Add(order);

                await _context.SaveChangesAsync();

                foreach (var item in input.Items)
                {
                    var product =
                        await _context.Products.FindAsync(
                            item.ProductId
                        );

                    if (product == null)
                    {
                        return BadRequest(new
                        {
                            message =
                                $"Không tìm thấy sản phẩm ID {item.ProductId}"
                        });
                    }

                    if (
                        product.StockQuantity <
                        item.Quantity
                    )
                    {
                        return BadRequest(new
                        {
                            message =
                                $"Sản phẩm {product.Name} không đủ tồn kho"
                        });
                    }

                    var orderDetail =
                        new OrderDetail
                        {
                            OrderId = order.Id,
                            ProductId = product.Id,
                            Quantity = item.Quantity,
                            UnitPrice = product.Price
                        };

                    _context.OrderDetails.Add(
                        orderDetail
                    );

                    // Trừ tồn kho
                    product.StockQuantity -=
                        item.Quantity;
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Đặt hàng thành công",
                    orderId = order.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        message = ex.Message
                    }
                );
            }
        }

        // ==========================
        // LẤY DANH SÁCH ĐƠN HÀNG
        // THEO KHÁCH HÀNG
        // GET: api/orders/customer/1
        // ==========================
        [HttpGet("customer/{customerId}")]
        public IActionResult GetOrdersByCustomer(
            int customerId)
        {
            var orders = _context.Orders
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.Product)
                .Where(x => x.CustomerId == customerId)
                .OrderByDescending(x => x.OrderDate)
                .Select(x => new
                {
                    x.Id,

                    x.OrderDate,

                    x.Status,

                    x.Notes,

                    TotalAmount =
                        x.OrderDetails.Sum(d =>
                            d.Quantity * d.UnitPrice),

                    TotalQuantity =
                        x.OrderDetails.Sum(d =>
                            d.Quantity),

                    ProductCount =
                        x.OrderDetails.Count(),

                    Products =
                        x.OrderDetails.Select(d => new
                        {
                            d.ProductId,

                            ProductName =
                                d.Product.Name,

                            ProductImage =
                                d.Product.ImageUrl,

                            d.Quantity,

                            d.UnitPrice,

                            LineTotal =
                                d.Quantity *
                                d.UnitPrice
                        })
                })
                .ToList();

            return Ok(orders);
        }

        // ==========================
        // CHI TIẾT ĐƠN HÀNG
        // GET: api/orders/5
        // ==========================
        [HttpGet("{id}")]
        public IActionResult GetOrderDetail(
            int id)
        {
            var order = _context.Orders
                .Include(x =>
                    x.OrderDetails)
                .ThenInclude(x =>
                    x.Product)
                .FirstOrDefault(x =>
                    x.Id == id);

            if (order == null)
            {
                return NotFound(new
                {
                    message =
                        "Không tìm thấy đơn hàng"
                });
            }

            var result = new
            {
                order.Id,
                order.OrderDate,
                order.Status,
                order.Notes,

                Products = order.OrderDetails
                    .Select(x => new
                    {
                        ProductId =
                            x.ProductId,

                        ProductName =
                            x.Product.Name,

                        Quantity =
                            x.Quantity,

                        UnitPrice =
                            x.UnitPrice,

                        Total =
                            x.UnitPrice *
                            x.Quantity
                    }),

                TotalAmount =
                    order.OrderDetails.Sum(x =>
                        x.UnitPrice *
                        x.Quantity)
            };

            return Ok(result);
        }
    }

    // ==========================
    // DTO TẠO ĐƠN HÀNG
    // ==========================
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }

        public string? Notes { get; set; }

        public List<OrderItemDTO> Items { get; set; }
            = new();
    }

    public class OrderItemDTO
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}