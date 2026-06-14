import React, { useState, useEffect } from "react";
import categoryProductService from "../../services/categoryProductService";

function CategoryMenu() {
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                const data =
                    await categoryProductService.getAllCategoryProducts();
                setCategories(data);
            } catch (error) {
                console.error(
                    "Lỗi khi kéo danh mục sản phẩm:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMenuCategories();
    }, []);

    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        console.log("Filter category ID:", id);
    };

    if (loading) {
        return (
            <div className="my-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
                Đang nạp menu phân loại...
            </div>
        );
    }

    return (
        <section className="my-4">
            <div className="mx-auto max-w-[1500px] px-4">

                {/* CARD (thay Bootstrap card) */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="p-2">

                        {/* NAV giống Bootstrap nav-fill */}
                        <ul className="flex flex-col sm:flex-row sm:items-stretch">

                            {/* ALL BUTTON */}
                            <li className="m-1 flex-1">
                                <button
                                    onClick={() => handleCategoryClick(null)}
                                    className={`w-full py-3 text-sm font-bold uppercase transition-all duration-300 ${
                                        activeCategoryId === null
                                            ? "rounded-xl bg-emerald-500 text-white shadow-md"
                                            : "rounded-xl bg-transparent text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    <i className="fas fa-th-large mr-2"></i>
                                    Tất cả sản phẩm
                                </button>
                            </li>

                            {/* CATEGORY LIST */}
                            {categories.map((cat) => (
                                <li key={cat.id} className="m-1 flex-1">
                                    <button
                                        onClick={() =>
                                            handleCategoryClick(cat.id)
                                        }
                                        className={`w-full py-3 text-sm font-bold uppercase transition-all duration-300 ${
                                            activeCategoryId === cat.id
                                                ? "rounded-xl bg-emerald-500 text-white shadow-md"
                                                : "rounded-xl bg-transparent text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryMenu;