import React, {
    useState,
    useEffect
} from "react";

import categoryProductService from "../../services/categoryProductService";

function CategoryMenu({
    activeCategoryId,
    setActiveCategoryId
}) {

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchMenuCategories =
            async () => {

                try {

                    setLoading(true);

                    const data =
                        await categoryProductService.getAllCategoryProducts();

                    setCategories(data);

                } catch (error) {

                    console.error(
                        "Lỗi khi tải danh mục:",
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

    };

    if (loading) {
        return (
            <div className="my-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
                Đang nạp danh mục...
            </div>
        );
    }

    return (
        <section className="my-4">

            <div className="mx-auto max-w-[1500px] px-4">

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="p-2">

                        <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch">

                            <li className="m-1">

                                <button
                                    onClick={() =>
                                        handleCategoryClick(
                                            null
                                        )
                                    }
                                    className={`px-5 py-3 text-sm font-bold uppercase transition-all duration-300 ${
                                        activeCategoryId ===
                                        null
                                            ? "rounded-xl bg-emerald-500 text-white shadow-md"
                                            : "rounded-xl bg-transparent text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    Tất cả sản phẩm
                                </button>

                            </li>

                            {categories.map(
                                (cat) => (
                                    <li
                                        key={cat.id}
                                        className="m-1"
                                    >
                                        <button
                                            onClick={() =>
                                                handleCategoryClick(
                                                    cat.id
                                                )
                                            }
                                            className={`px-5 py-3 text-sm font-bold uppercase transition-all duration-300 ${
                                                activeCategoryId ===
                                                cat.id
                                                    ? "rounded-xl bg-emerald-500 text-white shadow-md"
                                                    : "rounded-xl bg-transparent text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default CategoryMenu;