import React from "react";
import { Construction, Newspaper, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Blog() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
                        <Construction
                            size={50}
                            className="text-amber-500"
                        />
                    </div>
                </div>

                {/* Tiêu đề */}
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    Blog Đang Phát Triển
                </h1>

                {/* Mô tả */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    Chúng tôi đang xây dựng chuyên mục Blog với nhiều bài viết
                    hướng dẫn về <span className="font-semibold text-cyan-600">Arduino</span>,
                    <span className="font-semibold text-cyan-600"> ESP32</span>,
                    <span className="font-semibold text-cyan-600"> IoT</span>,
                    Smart Home và các dự án điện tử thực tế dành cho sinh viên,
                    kỹ sư và người yêu công nghệ.
                </p>

                {/* Card preview */}
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 mb-8">
                    <div className="flex justify-center mb-4">
                        <Newspaper
                            size={40}
                            className="text-cyan-600"
                        />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                        Nội dung sắp ra mắt
                    </h3>

                    <ul className="space-y-3 text-slate-600 text-left max-w-md mx-auto">
                        <li>✓ Hướng dẫn lập trình Arduino cơ bản</li>
                        <li>✓ Dự án IoT với ESP32 và WiFi</li>
                        <li>✓ Kết nối cảm biến nhiệt độ, độ ẩm</li>
                        <li>✓ Smart Home và điều khiển từ xa</li>
                        <li>✓ Review linh kiện điện tử mới</li>
                    </ul>
                </div>

                {/* Nút quay về */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <ArrowLeft size={18} />
                    Quay về trang chủ
                </Link>

            </div>
        </div>
    );
}

export default Blog;