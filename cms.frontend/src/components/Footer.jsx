import React from "react";
import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaYoutube,
    FaInstagram,
    FaTiktok,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaChevronRight
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-slate-950 text-white mt-16">

            {/* Top Footer */}
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo */}
                    <div>
                        <h2 className="text-3xl font-bold">
                            HaiCMS
                            <span className="text-cyan-400">.IoT</span>
                        </h2>

                        <p className="text-slate-400 mt-4 leading-7">
                            Chuyên cung cấp Arduino, ESP32, Raspberry Pi,
                            cảm biến, module IoT, linh kiện điện tử và giải pháp
                            nhà thông minh cho sinh viên và kỹ sư.
                        </p>

                        <div className="flex gap-3 mt-6">

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 duration-300 flex items-center justify-center"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-500 duration-300 flex items-center justify-center"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 duration-300 flex items-center justify-center"
                            >
                                <FaYoutube />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-600 duration-300 flex items-center justify-center"
                            >
                                <FaTiktok />
                            </a>

                        </div>
                    </div>

                    {/* Danh mục */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5 text-cyan-400">
                            Danh Mục
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Arduino
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    ESP32 / ESP8266
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Cảm Biến
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Module IoT
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Robot Kit
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Chính sách */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5 text-cyan-400">
                            Chính Sách
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Chính sách giao hàng
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Chính sách đổi trả
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Bảo hành sản phẩm
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 duration-300"
                                >
                                    <FaChevronRight size={10} />
                                    Điều khoản sử dụng
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h3 className="text-xl font-semibold mb-5 text-cyan-400">
                            Liên Hệ
                        </h3>

                        <div className="space-y-4">

                            <div className="flex gap-3">
                                <FaMapMarkerAlt className="text-cyan-400 mt-1" />
                                <span className="text-slate-400">
                                    Khu Công Nghệ Cao, TP. Hồ Chí Minh
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <FaPhoneAlt className="text-cyan-400 mt-1" />
                                <span className="text-slate-400">
                                    0909 999 999
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <FaEnvelope className="text-cyan-400 mt-1" />
                                <span className="text-slate-400">
                                    support@haicmsiot.com
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-5">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">

                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} HaiCMS IoT Store.
                            All Rights Reserved.
                        </p>

                        <p className="text-slate-500 text-sm">
                            Arduino • ESP32 • IoT • Smart Home • Robotics
                        </p>

                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;