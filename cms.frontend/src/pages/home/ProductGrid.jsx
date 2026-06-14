import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import ProductCard from "../../components/ProductCard";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi tải sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

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

    return (
        <section className="bg-slate-50 py-10">
            <div className="mx-auto max-w-[1500px] px-4 md:px-6">
{/* Header */}
<div className="mb-8 text-center">
    <h2 className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
        Sản Phẩm Nổi Bật
    </h2>

    <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
</div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            item={product}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                        <div className="flex flex-wrap items-center gap-2">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                ← Trước
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setCurrentPage(index + 1)
                                    }
                                    className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                                        currentPage === index + 1
                                            ? "bg-emerald-500 text-white shadow-md"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Sau →
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductGrid;