/*
*Sinh viên: Ma Văn Hải
*Mssv: 2123110001
*Ngày: 5-14-2026
*Phiên bản: 1.0
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    // Khách hàng
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        [Required]
        public string Password { get; set; } // Lưu mật khẩu thô theo yêu cầu tối giản

        public virtual ICollection<Order>? Orders { get; set; }
    }
}
