import React from "react";

const IMAGE_BASE_URL = "https://localhost:7218";

function PostCard({ post }) {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            {/* Image */}
            <div className="relative h-64 overflow-hidden">

                <img
                    src={IMAGE_BASE_URL + post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {post.createdDate
                        ? new Date(post.createdDate).toLocaleDateString("vi-VN")
                        : "Mới cập nhật"}
                </div>

            </div>

            {/* Content */}
            <div className="p-6">


                <h3 className="line-clamp-2 min-h-[60px] text-xl font-bold text-slate-800 transition group-hover:text-emerald-600">
                    <a href={`/blog/${post.id}`}>
                        {post.title}
                    </a>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                    {post.summary ||
                        "Khám phá các xu hướng thời trang mới nhất, bí quyết phối đồ và những mẹo giúp bạn tự tin hơn mỗi ngày."}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">

                    <a
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition hover:gap-3"
                    >
                        Đọc thêm
                        <i className="fas fa-arrow-right"></i>
                    </a>

                </div>
            </div>
        </div>
    );
}

export default PostCard;