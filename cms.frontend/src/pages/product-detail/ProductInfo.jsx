import React, { useState } from "react";
import {
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

const IMAGE_BASE_URL = "https://localhost:7218";

function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const increaseQty = () => {
        if (quantity < product.stockQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const addToCart = () => {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
        (x) => x.id === product.id
    );

    if (existingItem) {
        existingItem.quantity += quantity;

        if (
            existingItem.quantity >
            product.stockQuantity
        ) {
            existingItem.quantity =
                product.stockQuantity;
        }
    } else {
        cart.push({
            ...product,
            quantity,
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    window.dispatchEvent(
        new Event("cartUpdated")
    );
    alert("Đã thêm vào giỏ hàng");
};

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

            <div className="grid lg:grid-cols-2 gap-10 p-8">

                {/* IMAGE */}
                <div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <img
                            src={IMAGE_BASE_URL + product.imageUrl}
                            alt={product.name}
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                </div>

                {/* INFO */}
                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center mt-4 gap-2">
                        <div className="flex text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>

                        <span className="text-slate-500">
                            5.0 (100 đánh giá)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <span className="text-4xl font-bold text-red-500">
                            {formatCurrency(product.price)}
                        </span>

                        <span className="ml-3 text-slate-400 line-through">
                            {formatCurrency(product.price * 1.2)}
                        </span>
                    </div>

                    {/* Stock */}
                    <div className="mt-6">
                        {product.stockQuantity > 0 ? (
                            <span className="rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold">
                                Còn hàng ({product.stockQuantity})
                            </span>
                        ) : (
                            <span className="rounded-full bg-red-100 text-red-700 px-4 py-2 text-sm font-semibold">
                                Hết hàng
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        <h3 className="font-bold text-lg mb-3">
                            Mô tả sản phẩm
                        </h3>

                        <div
                            className="text-slate-600 leading-7"
                            dangerouslySetInnerHTML={{
                                __html: product.description
                            }}
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mt-8">
                        <h3 className="font-semibold mb-3">
                            Số lượng
                        </h3>

                        <div className="flex items-center">

                            <button
                                onClick={decreaseQty}
                                className="h-12 w-12 border rounded-l-xl"
                            >
                                -
                            </button>

                            <div className="h-12 w-16 border-t border-b flex items-center justify-center font-semibold">
                                {quantity}
                            </div>

                            <button
                                onClick={increaseQty}
                                className="h-12 w-12 border rounded-r-xl"
                            >
                                +
                            </button>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-wrap gap-4">

                        <button
                            onClick={addToCart}
                            className="flex-1 min-w-[220px] rounded-xl bg-emerald-500 hover:bg-emerald-600 py-4 text-white font-semibold flex items-center justify-center gap-3"
                        >
                            <FaShoppingCart />
                            Thêm vào giỏ hàng
                        </button>

                        {/* <button
                            className="flex-1 min-w-[220px] rounded-xl bg-orange-500 hover:bg-orange-600 py-4 text-white font-semibold flex items-center justify-center gap-3"
                        >
                            <FaBolt />
                            Mua ngay
                        </button> */}

                    </div>

                    {/* Service */}
                    <div className="mt-10 border-t pt-6">

                        <div className="space-y-3 text-slate-600">

                            <p>
                                ✓ Giao hàng toàn quốc
                            </p>

                            <p>
                                ✓ Hỗ trợ kỹ thuật miễn phí
                            </p>

                            <p>
                                ✓ Đổi trả trong 7 ngày
                            </p>

                            <p>
                                ✓ Bảo hành chính hãng
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductInfo;