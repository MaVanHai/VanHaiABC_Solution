import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import postService from "../../services/postService";
import MainLayout from '../../components/layout/MainLayout';

const IMAGE_BASE_URL = "https://localhost:7218";

function BlogDetail() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);

                const data =
                    await postService.getPostById(id);

                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-red-500">
                    Không tìm thấy bài viết
                </h2>
            </div>
        );
    }

    return (
        <MainLayout>
        <section className="bg-slate-50 py-10">
            <div className="mx-auto max-w-5xl px-4">

                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-slate-500">
                    <Link
                        to="/"
                        className="hover:text-emerald-500"
                    >
                        Trang chủ
                    </Link>

                    <span className="mx-2">/</span>

                    <Link
                        to="/blog"
                        className="hover:text-emerald-500"
                    >
                        Tin tức
                    </Link>

                    <span className="mx-2">/</span>

                    <span className="font-medium text-slate-700">
                        {post.title}
                    </span>
                </div>

                {/* Card */}
                <article className="overflow-hidden rounded-3xl bg-white shadow-sm">

                    {/* Image */}
                    <img
                        src={IMAGE_BASE_URL + post.imageUrl}
                        alt={post.title}
                        className="h-[450px] w-full object-cover"
                    />

                    <div className="p-8">

                        {/* Date */}
                        <div className="mb-4 text-sm text-slate-500">
                            {post.createdDate &&
                                new Date(
                                    post.createdDate
                                ).toLocaleDateString(
                                    "vi-VN"
                                )}
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 text-4xl font-bold text-slate-800">
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: post.content
                            }}
                        />

                    </div>
                </article>

            </div>
        </section>
        </MainLayout>
    );
}

export default BlogDetail;