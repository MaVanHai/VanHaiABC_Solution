import React, { useEffect, useState } from "react";

import productService from "../../services/productService";
import categoryProductService from "../../services/categoryProductService";

import ShopSidebar from "./ShopSidebar";
import ShopHeader from "./ShopHeader";
import ProductList from "./ProductList";
import LoadingOrEmpty from "./LoadingOrEmpty";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);

    const [maxPrice, setMaxPrice] = useState(0);
    const [priceLimit, setPriceLimit] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;

    // Load Category
    useEffect(() => {
        loadCategories();
    }, []);

    // Load Product khi bộ lọc thay đổi
    useEffect(() => {
        loadProducts();
    }, [activeCategory, keyword, maxPrice]);

    const loadCategories = async () => {
        try {
            const categoryData =
                await categoryProductService.getAllCategoryProducts();

            setCategories(categoryData);
        } catch (error) {
            console.error(error);
        }
    };

    const loadProducts = async () => {
        try {
            setLoading(true);

            const filters = {};

            if (activeCategory) {
                filters.categoryProductId = activeCategory;
            }

            if (keyword.trim()) {
                filters.keyword = keyword.trim();
            }

            if (maxPrice > 0) {
                filters.maxPrice = maxPrice;
            }

            const productData =
                await productService.getAllProducts(filters);

            setProducts(productData);

            if (priceLimit === 0) {
                const highestPrice =
                    productData.length > 0
                        ? Math.max(
                              ...productData.map((p) =>
                                  Number(p.price)
                              )
                          )
                        : 0;

                setPriceLimit(highestPrice);
                setMaxPrice(highestPrice);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
                <div className="mx-auto max-w-[1600px] px-6">

                    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

                        <ShopSidebar
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={(id) => {
                                setActiveCategory(id);
                                setCurrentPage(1);
                            }}
                            maxPrice={maxPrice}
                            setMaxPrice={(value) => {
                                setMaxPrice(value);
                                setCurrentPage(1);
                            }}
                            priceLimit={priceLimit}
                        />

                        <div>

                            <ShopHeader
                                totalProducts={
                                    products.length
                                }
                                keyword={keyword}
                                setKeyword={(value) => {
                                    setKeyword(value);
                                    setCurrentPage(1);
                                }}
                            />

                            <div className="mt-6">

                                <LoadingOrEmpty
                                    loading={loading}
                                    products={products}
                                />

                                {!loading &&
                                    products.length > 0 && (
                                        <>
                                            <ProductList
                                                products={
                                                    currentProducts
                                                }
                                            />

                                            <div className="mt-10 flex justify-center gap-2">

                                                <button
                                                    disabled={
                                                        currentPage === 1
                                                    }
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
                                                        currentPage ===
                                                        totalPages
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
                                        </>
                                    )}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default Shop;