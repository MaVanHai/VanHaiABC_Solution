import React from "react";
import { Link } from "react-router-dom";
import {
    ShoppingCart,
    ArrowLeft,
    Cpu,
    Package
} from "lucide-react";

function Cart() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-800">
                        Giỏ Hàng
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Kiểm tra các linh kiện trước khi đặt hàng
                    </p>
                </div>

                {/* Empty Cart */}
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                    <div className="flex justify-center mb-6">
                        <div className="w-28 h-28 rounded-full bg-cyan-100 flex items-center justify-center">
                            <ShoppingCart
                                size={55}
                                className="text-cyan-600"
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 mb-3">
                        Giỏ hàng đang trống
                    </h2>

                    <p className="text-slate-500 max-w-xl mx-auto mb-8">
                        Hiện tại bạn chưa thêm sản phẩm nào vào giỏ hàng.
                        Khám phá hàng trăm linh kiện điện tử, Arduino, ESP32,
                        cảm biến và module IoT tại cửa hàng.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10">

                        <div className="bg-slate-100 px-5 py-3 rounded-xl flex items-center gap-2">
                            <Cpu size={20} className="text-cyan-600" />
                            <span>Arduino</span>
                        </div>

                        <div className="bg-slate-100 px-5 py-3 rounded-xl flex items-center gap-2">
                            <Package size={20} className="text-cyan-600" />
                            <span>ESP32 & IoT</span>
                        </div>

                        <div className="bg-slate-100 px-5 py-3 rounded-xl flex items-center gap-2">
                            <Cpu size={20} className="text-cyan-600" />
                            <span>Cảm biến</span>
                        </div>

                    </div>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                    >
                        <ArrowLeft size={20} />
                        Tiếp tục mua sắm
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Cart;