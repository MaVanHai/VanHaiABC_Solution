import React from "react";
import { Construction, Newspaper, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Shop() {
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
                    sp đang Phát Triển
                </h1>

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

export default Shop;