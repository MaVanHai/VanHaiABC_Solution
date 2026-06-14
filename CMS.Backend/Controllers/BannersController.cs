using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BannersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/banners
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var banners = await _context.Banners
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            return Ok(banners);
        }

        // GET: api/banners/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var banner = await _context.Banners
                .FirstOrDefaultAsync(x => x.Id == id);

            if (banner == null)
                return NotFound(new { message = "Không tìm thấy banner" });

            return Ok(banner);
        }

        // POST: api/banners
        [HttpPost]
        public async Task<IActionResult> Create(Banner model)
        {
            _context.Banners.Add(model);
            await _context.SaveChangesAsync();

            return Ok(model);
        }

        // PUT: api/banners/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Banner model)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null) return NotFound();

            banner.Title = model.Title;
            banner.ImageUrl = model.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(banner);
        }

        // DELETE: api/banners/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner == null)
                return NotFound();

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted" });
        }
    }
}