import React from "react";

function LoadingOrEmpty({ loading, products }) {
    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

                    <p className="mt-4 text-slate-500">
                        Đang tải sản phẩm...
                    </p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-700">
                        Không tìm thấy sản phẩm
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Hãy thử từ khóa hoặc bộ lọc khác.
                    </p>
                </div>
            </div>
        );
    }

    return null;
}

export default LoadingOrEmpty;