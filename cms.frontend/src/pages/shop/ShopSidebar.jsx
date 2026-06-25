import React from "react";

function ShopSidebar({
    categories,
    activeCategory,
    setActiveCategory,
    maxPrice,
    setMaxPrice,
    priceLimit
}) {
    return (
        <div className="rounded-3xl bg-white p-5 shadow-sm">

            <h3 className="mb-5 text-lg font-bold text-slate-800">
                Danh mục
            </h3>

            <div className="space-y-2">

                <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                        activeCategory === null
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                    Tất cả sản phẩm
                </button>

                {categories.map((item) => (
                    <button
                        key={item.id}
                        onClick={() =>
                            setActiveCategory(item.id)
                        }
                        className={`w-full rounded-xl px-4 py-3 text-left transition ${
                            activeCategory === item.id
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                        }`}
                    >
                        {item.name}
                    </button>
                ))}

            </div>
{/* PRICE FILTER */}
<div className="mt-8 border-t pt-6">

    <h3 className="mb-4 text-lg font-bold text-slate-800">
        Khoảng giá
    </h3>

    <input
        type="range"
        min="0"
        max={priceLimit}
        step="50000"
        value={maxPrice}
        onChange={(e) =>
            setMaxPrice(Number(e.target.value))
        }
        className="w-full accent-emerald-500"
    />

    <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
        <span>0 đ</span>

        <span className="font-semibold text-emerald-600">
            {maxPrice.toLocaleString("vi-VN")} đ
        </span>
    </div>

</div>
        </div>
    );
}

export default ShopSidebar;