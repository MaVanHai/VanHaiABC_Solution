import React from "react";
import { FaSearch } from "react-icons/fa";

function ShopHeader({
    totalProducts,
    keyword,
    setKeyword
}) {
    return (
        <div className="rounded-3xl bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <h2 className="text-xl font-bold text-slate-800">
                    Tìm thấy
                    <span className="mx-2 text-emerald-500">
                        {totalProducts}
                    </span>
                    sản phẩm
                </h2>

                <div className="relative w-full lg:w-[450px]">

                    <FaSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                        placeholder="Tìm sản phẩm..."
                        className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-emerald-500"
                    />

                </div>

            </div>

        </div>
    );
}

export default ShopHeader;