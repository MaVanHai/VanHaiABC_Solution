import React from "react";

function BlogSidebar({
    categories,
    activeCategory,
    setActiveCategory
}) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-xl font-bold">
                Danh mục bài viết
            </h3>

            <div className="space-y-2">

                <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full rounded-xl px-4 py-3 text-left ${
                        activeCategory === null
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100"
                    }`}
                >
                    Tất cả bài viết
                </button>

                {categories.map((item) => (
                    <button
                        key={item.id}
                        onClick={() =>
                            setActiveCategory(item.id)
                        }
                        className={`w-full rounded-xl px-4 py-3 text-left ${
                            activeCategory === item.id
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-100"
                        }`}
                    >
                        {item.name}
                    </button>
                ))}

            </div>
        </div>
    );
}

export default BlogSidebar;