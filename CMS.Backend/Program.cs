using CMS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// C?u hình Cookie Authentication
builder.Services.AddAuthentication(
    CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        // Trang ??ng nh?p
        options.LoginPath = "/Account/Login";

        // Trang báo không ?? quy?n (n?u có)
        options.AccessDeniedPath = "/Account/AccessDenied";

        // Th?i gian s?ng c?a Cookie
        options.ExpireTimeSpan = TimeSpan.FromHours(8);

        options.SlidingExpiration = true;
    });
builder.Services.AddAuthorization();
// ---- C?U HÌNH CORS (THÊM VÀO TR??C builder.Build()) ----
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Cho phép ReactJS ? port 3000 g?i t?i
              .AllowAnyHeader()                     // Cho phép m?i lo?i Header (Content-Type, Authorization...)
              .AllowAnyMethod()                     // Cho phép m?i ph??ng th?c HTTP (GET, POST, PUT, DELETE)
              .AllowCredentials();                  // H? tr? truy?n Cookie/Session n?u c?n sau này
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseStaticFiles();

// Kích ho?t CORS ?úng v? trí này
app.UseCors("AllowReactApp");

//app.UseAuthorization();

// Authentication ph?i ??ng tr??c Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();