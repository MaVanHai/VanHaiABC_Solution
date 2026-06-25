import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import productService from "../../services/productService";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

function SearchResult() {

    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;

    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);

                const data =
                    await productService.getAllProducts({
                        keyword
                    });

                setProducts(data);

                setCurrentPage(1);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        loadProducts();

    }, [keyword]);

    // Pagination
    const totalPages = Math.ceil(
        products.length / productsPerPage
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const currentProducts =
        products.slice(
            startIndex,
            startIndex + productsPerPage
        );

    return (
        <>
            <Header />

            <section className="min-h-screen bg-slate-50 py-10">

                <div className="mx-auto max-w-7xl px-4">

                    <h1 className="mb-2 text-3xl font-bold">
                        Kết quả tìm kiếm
                    </h1>

                    <p className="mb-8 text-slate-500">
                        Từ khóa: <strong>{keyword}</strong>
                    </p>

                    {loading ? (

                        <div className="text-center py-10">
                            Đang tải...
                        </div>

                    ) : products.length === 0 ? (

                        <div className="rounded-2xl bg-white p-10 text-center shadow">
                            Không tìm thấy sản phẩm phù hợp
                        </div>

                    ) : (

                        <>
                            {/* Product Grid */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {currentProducts.map((item) => (

                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                    />

                                ))}

                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (

                                <div className="mt-10 flex justify-center gap-2">

                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage - 1
                                            )
                                        }
                                        className="rounded-xl border bg-white px-4 py-2 disabled:opacity-40"
                                    >
                                        ←
                                    </button>

                                    {[...Array(totalPages)].map(
                                        (_, index) => (

                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        index + 1
                                                    )
                                                }
                                                className={`h-11 w-11 rounded-xl font-semibold transition ${
                                                    currentPage ===
                                                    index + 1
                                                        ? "bg-emerald-500 text-white"
                                                        : "border bg-white hover:bg-slate-100"
                                                }`}
                                            >
                                                {index + 1}
                                            </button>

                                        )
                                    )}

                                    <button
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage + 1
                                            )
                                        }
                                        className="rounded-xl border bg-white px-4 py-2 disabled:opacity-40"
                                    >
                                        →
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </section>

            <Footer />
        </>
    );
}

export default SearchResult;