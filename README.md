# ĐỒ ÁN ASP.NET CORE MVC & REACTJS

## HỆ THỐNG QUẢN LÝ NỘI DUNG (CMS)

---

## 1. Giới thiệu đề tài

Hệ thống Quản lý Nội dung (CMS - Content Management System) là một ứng dụng Web Full-Stack được xây dựng nhằm hỗ trợ quản lý bài viết, sản phẩm, khách hàng và đơn hàng trên cùng một nền tảng.

Dự án được phát triển theo mô hình tách biệt Frontend và Backend, trong đó:

* Backend sử dụng ASP.NET Core MVC và ASP.NET Core Web API.
* Frontend sử dụng ReactJS theo mô hình SPA (Single Page Application).
* Cơ sở dữ liệu sử dụng SQL Server.
* Entity Framework Core được sử dụng để truy cập và quản lý dữ liệu.

Hệ thống cho phép quản trị viên quản lý dữ liệu thông qua giao diện CMS, đồng thời cung cấp các API để ứng dụng ReactJS hiển thị dữ liệu động cho người dùng cuối.

---

## 2. Mục tiêu đề tài

Thông qua dự án này, sinh viên có thể:

* Nắm vững mô hình kiến trúc 3 lớp (3-Layer Architecture).
* Thành thạo ASP.NET Core MVC.
* Hiểu và sử dụng Entity Framework Core cùng Migration.
* Thực hiện các thao tác CRUD trên dữ liệu.
* Xây dựng và sử dụng RESTful API.
* Kết nối Frontend ReactJS với Backend thông qua Axios.
* Áp dụng xác thực và phân quyền người dùng.
* Xây dựng quy trình phát triển phần mềm theo hướng doanh nghiệp.

---

## 3. Kiến trúc hệ thống

```text
ReactJS (SPA)
        │
        │ HTTP Request (Axios)
        ▼
ASP.NET Core Web API
        │
        ▼
Business Logic (LINQ, Services)
        │
        ▼
Entity Framework Core
        │
        ▼
SQL Server Database
```

---

## 4. Công nghệ sử dụng

### Backend

* ASP.NET Core MVC
* ASP.NET Core Web API
* Entity Framework Core
* LINQ
* Cookie Authentication
* Authorization

### Frontend

* ReactJS
* React Router DOM
* Axios
* Hooks (useState, useEffect)

### Database

* SQL Server
* Entity Framework Core Migration

### Công cụ phát triển

* Visual Studio 2022
* NodeJS
* SQL Server Management Studio
* Git & GitHub
* Swagger UI

---

## 5. Cấu trúc dự án

### CMS.Backend

* Controllers
* Models
* Views
* wwwroot
* Program.cs
* appsettings.json

### CMS.Data

* Entities
* ApplicationDbContext
* Migrations

### cms.frontend

* Components
* Pages
* Services
* Router
* Axios Client

### SQL Server

* CMS_DB

---

## 6. Các chức năng chính

### 6.1 Quản trị hệ thống

* Quản lý người dùng
* Quản lý danh mục
* Quản lý sản phẩm
* Quản lý bài viết
* Quản lý khách hàng
* Quản lý đơn hàng
* Quản lý chi tiết đơn hàng

### 6.2 Web API

* Lấy danh sách dữ liệu
* Xem chi tiết dữ liệu
* Thêm mới dữ liệu
* Cập nhật dữ liệu
* Xóa dữ liệu

### 6.3 Frontend ReactJS

* Hiển thị danh sách bài viết
* Hiển thị danh sách sản phẩm
* Trang chi tiết sản phẩm
* Giỏ hàng
* Thanh toán đơn hàng
* Lịch sử mua hàng
* Điều hướng SPA bằng React Router

---

## 7. Thiết kế cơ sở dữ liệu

Các bảng chính:

* Category
* Post
* CategoryProduct
* Product
* Customer
* Order
* OrderDetail
* User

Hệ thống sử dụng khóa chính (Primary Key) và khóa ngoại (Foreign Key) để đảm bảo tính toàn vẹn dữ liệu.

---

## 8. Quy trình hoạt động

1. Quản trị viên đăng nhập hệ thống.
2. Thực hiện quản lý dữ liệu.
3. Dữ liệu được lưu xuống SQL Server.
4. Web API truy xuất dữ liệu từ Database.
5. ReactJS gọi API thông qua Axios.
6. Dữ liệu được hiển thị trên giao diện người dùng.

---

## 9. Hướng dẫn chạy dự án

### Bước 1: Clone mã nguồn

```bash
git clone <repository-url>
```

### Bước 2: Chạy Backend

```bash
cd CMS.Backend

dotnet restore

dotnet ef database update

dotnet run
```

### Bước 3: Chạy Frontend

```bash
cd cms.frontend

npm install

npm start
```

---

## 10. Bảo mật hệ thống

* Cookie Authentication
* Authorization theo Role
* Kiểm tra dữ liệu đầu vào
* Validate dữ liệu phía Server
* Bảo vệ API khỏi truy cập trái phép

---

## 11. Ưu điểm của hệ thống

* Kiến trúc rõ ràng, dễ bảo trì.
* Tách biệt Frontend và Backend.
* Hỗ trợ mở rộng chức năng dễ dàng.
* Sử dụng công nghệ hiện đại.
* Giao diện ReactJS mượt mà.
* Dễ triển khai thực tế trong doanh nghiệp.

---

## 12. Hướng phát triển

* JWT Authentication
* Thanh toán trực tuyến
* Dashboard thống kê
* Quản lý khuyến mãi
* Bình luận và đánh giá sản phẩm
* Tích hợp Cloud Storage
* Docker và CI/CD

---

## 13. Kết luận

Dự án CMS đã xây dựng thành công một hệ thống quản lý nội dung theo mô hình Full-Stack sử dụng ASP.NET Core MVC, ASP.NET Core Web API, Entity Framework Core, SQL Server và ReactJS.

Thông qua quá trình thực hiện, sinh viên đã vận dụng được kiến thức về lập trình Web, thiết kế cơ sở dữ liệu, xây dựng API RESTful, phát triển SPA và triển khai hệ thống theo quy trình phát triển phần mềm hiện đại.

---

### Thông tin thực hiện

* Sinh viên: Ma Văn Hải
* Môn học: ASP.NET Core Advanced
* Năm học: 2026
* Giảng viên hướng dẫn: ThS. Nguyễn Cao Thái
