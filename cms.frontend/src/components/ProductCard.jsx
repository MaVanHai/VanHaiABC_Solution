import React from "react";

const IMAGE_BASE_URL = "https://localhost:7218";

function ProductCard({ item }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* IMAGE */}
            <div className="relative h-[200px] overflow-hidden bg-slate-100">

                <img
                    src={IMAGE_BASE_URL + item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold text-white">
                    NEW
                </span>

           {item.stockQuantity > 0 && item.stockQuantity <= 5 && (
    <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
        Còn {item.stockQuantity}
    </span>
)}
            </div>

            {/* CONTENT */}
            <div className="flex flex-col p-4">

                {/* NAME */}
                <h3 className="line-clamp-2 min-h-[56px] text-base font-bold text-slate-800">
                    {item.name}
                </h3>

                {/* DESCRIPTION */}
<p className="mt-1 line-clamp-1 text-sm text-slate-500">
    {item.description}
</p>

                {/* RATING */}
                <div className="mt-3 flex items-center text-sm">
                    <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>

                    <span className="ml-2 text-slate-500">
                        4.8
                    </span>
                </div>

                {/* PRICE */}
<div className="mt-3 flex items-center gap-2">
    <span className="text-xl font-bold text-red-500">
        {formatCurrency(item.price)}
    </span>

    <span className="text-sm text-slate-400 line-through">
        {formatCurrency(item.price * 1.2)}
    </span>
</div>



                {/* BUTTONS */}
                <div className="mt-4 flex gap-2">

                    <a
                        href={`/product/${item.id}`}
                        className="flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                    >
                        <i className="fas fa-eye"></i>
                    </a>

                    <button
                        className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Mua ngay
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductCard;