import React, { useState, useEffect } from "react";
import blogService from "../../services/postService";
import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";
function LatestBlog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                setLoading(true);

                const data = await blogService.getAllPosts();

                const topThreePosts = data
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 3);

                setPosts(topThreePosts);
            } catch (error) {
                console.error(
                    "Lỗi hệ thống khi tải tin tức thời trang:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPosts();
    }, []);

    if (loading) {
        return (
            <section className="bg-slate-50 py-16">
                <div className="flex justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

                        <p className="mt-4 text-sm text-slate-500">
                            Đang tải tin tức mới nhất...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-[1500px] px-4">

                {/* HEADER */}
                <div className="mb-10 text-center">

                    <span className="text-sm font-semibold uppercase tracking-[4px] text-emerald-500">
                        Fashion Blog
                    </span>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                        Tin Tức & Xu Hướng
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Cập nhật xu hướng thời trang mới nhất,
                        mẹo phối đồ và phong cách sống hiện đại.
                    </p>

                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>

                </div>

                {/* BLOG GRID */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((item) => (
                        <PostCard
                            key={item.id}
                            post={item}
                        />
                    ))}
                </div>

                {/* BUTTON XEM THÊM */}
                <div className="mt-10 text-center">
     <Link
    to="/blog"
    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
>
    Xem tất cả bài viết
    <i className="fas fa-arrow-right"></i>
</Link>
                </div>

            </div>
        </section>
    );
}

export default LatestBlog;