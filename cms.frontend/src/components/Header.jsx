import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Cpu,
  Search,
  ShoppingCart,
  User,
  Phone,
  Mail,
  Truck,
  Bell,
} from "lucide-react";

function Header() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600"
      : "text-slate-600 hover:text-blue-600";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* TOP BAR */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="h-10 flex items-center justify-between text-sm">

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>0909.xxx.xxx</span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <Mail size={14} />
                <span>support@haicmsiot.com</span>
              </div>

            </div>

            <div className="hidden md:flex items-center gap-2">
              <Truck size={14} />
              <span>Miễn phí vận chuyển đơn từ 500.000đ</span>
            </div>

          </div>

        </div>
      </div>

      {/* MAIN HEADER */}
<div className="bg-white py-4">
  <div className="max-w-7xl mx-auto px-4">

    <div className="flex items-center gap-6">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-3 shrink-0"
      >
        <div className="
          w-14 h-14
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          flex items-center justify-center
        ">
          <Cpu className="text-white" size={28}/>
        </div>

        <div>
          <h2 className="font-bold text-xl text-slate-800">
            HaiCMS
          </h2>

          <p className="text-xs text-slate-500">
            Electronics & IoT
          </p>
        </div>
      </Link>

      {/* SEARCH */}
      <div className="flex-1">

        <form>

          <div className="
            flex
            h-14
            rounded-2xl
            overflow-hidden
            border-2
            border-blue-500
            bg-white
            shadow-lg
          ">

            <div className="
              px-4
              flex
              items-center
              text-slate-400
            ">
              <Search size={22}/>
            </div>

            <input
              type="text"
              placeholder="Tìm Arduino, ESP32, Relay, Module..."
              className="
                flex-1
                outline-none
                px-2
              "
            />

            <button
              className="
                px-8
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
              "
            >
              Tìm kiếm
            </button>

          </div>

        </form>

      </div>

      {/* ACTION */}
      <div className="flex items-center gap-3 shrink-0">

        <Link
          to="/login"
          className="
            flex
            items-center
            gap-2
            px-4
            h-14
            rounded-2xl
            bg-slate-100
            hover:bg-slate-200
          "
        >
          <User size={20}/>
          <div className="hidden lg:block">
            <div className="text-xs text-slate-500">
              Tài khoản
            </div>
            <div className="font-semibold">
              Đăng nhập
            </div>
          </div>
        </Link>

        <Link
          to="/cart"
          className="
            flex
            items-center
            gap-3
            px-4
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            shadow-lg
          "
        >
          <div className="relative">
            <ShoppingCart size={24}/>

            <span
              className="
                absolute
                -top-2
                -right-2
                w-5
                h-5
                rounded-full
                bg-red-500
                text-xs
                flex
                items-center
                justify-center
              "
            >
              0
            </span>
          </div>

          <div className="hidden lg:block">
            <div className="text-xs opacity-80">
              Giỏ hàng
            </div>
          </div>

        </Link>

      </div>

    </div>
  </div>
</div>

      {/* MENU */}
      <nav className="border-t border-b border-slate-200 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <ul className="flex gap-10 h-14 items-center font-medium">

            <li>
              <Link to="/" className={isActive("/")}>
                Trang Chủ
              </Link>
            </li>

            <li>
              <Link to="/shop" className={isActive("/shop")}>
                Linh Kiện
              </Link>
            </li>

            <li>
              <Link to="/blog" className={isActive("/blog")}>
                Dự Án IoT
              </Link>
            </li>

            <li>
              <Link to="/blog" className={isActive("/blog")}>
                Hướng Dẫn
              </Link>
            </li>

            <li>
              <Link to="/about" className={isActive("/about")}>
                Giới Thiệu
              </Link>
            </li>

            <li>
              <Link to="/contact" className="text-slate-600 hover:text-blue-600">
                Liên Hệ
              </Link>
            </li>

          </ul>

        </div>

      </nav>

    </header>
  );
}

export default Header;