import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";

import blogService from "../../services/postService";
import categoryService from "../../services/categoryService";

import BlogSidebar from "./BlogSidebar";

function Blog() {

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [activeCategory, setActiveCategory] =
        useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {

            const postData =
                await blogService.getAllPosts();

            const categoryData =
                await categoryService.getAllCategories();

            setPosts(postData);
            console.log(postData);
            setCategories(categoryData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

const filteredPosts = posts.filter((item) => {

    const matchKeyword =
        item.title
            .toLowerCase()
            .includes(keyword.toLowerCase());

    const matchCategory =
        activeCategory === null ||
        Number(item.categoryId) === Number(activeCategory);

    return matchKeyword && matchCategory;
});

    return (
        <>
            <Header />

            <section className="bg-slate-50 py-10 min-h-screen">

                <div className="mx-auto max-w-[1500px] px-4">

                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

                        <BlogSidebar
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />

                        <div>

                            <h2 className="mb-6 text-3xl font-bold">
                                Tất cả bài viết
                            </h2>
<div className="mb-6">
    <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={keyword}
        onChange={(e) =>
            setKeyword(e.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
</div>
                            {loading ? (
                                <div>
                                    Đang tải...
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {filteredPosts.map((item) => (
                                        <PostCard
                                            key={item.id}
                                            post={item}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Blog;