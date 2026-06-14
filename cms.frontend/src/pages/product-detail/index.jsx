import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/productService";
import ProductInfo from "./ProductInfo";
import ProductCard from "../../components/ProductCard";
import MainLayout from "../../components/layout/MainLayout";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            // Lấy sản phẩm hiện tại
            const productData = await productService.getProductById(id);

            setProduct(productData);

            // Lấy toàn bộ sản phẩm
const allProducts = await productService.getAllProducts();

// Lọc sản phẩm cùng danh mục
const sameCategory = allProducts.filter(
    (item) =>
        item.id !== productData.id &&
        Number(item.categoryProductId) ===
            Number(productData.categoryProductId)
);

setRelatedProducts(
    sameCategory.slice(0, 4)

);

        } catch (error) {
            console.error(
                "Lỗi tải chi tiết sản phẩm:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    fetchData();

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-[500px]">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                </div>
            </MainLayout>
        );
    }

    if (!product) {
        return (
            <MainLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-red-500">
                        Không tìm thấy sản phẩm
                    </h2>

                    <Link
                        to="/shop"
                        className="inline-block mt-6 rounded-lg bg-emerald-500 px-6 py-3 text-white"
                    >
                        Quay lại cửa hàng
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <section className="bg-slate-50 py-10">
                <div className="max-w-7xl mx-auto px-4">

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
                            to="/shop"
                            className="hover:text-emerald-500"
                        >
                            Sản phẩm
                        </Link>

                        <span className="mx-2">/</span>

                        <span className="font-medium text-slate-700">
                            {product.name}
                        </span>
                    </div>

                    {/* Product Detail */}
                    <ProductInfo product={product} />

                    {/* Related Products */}
                    <section className="mt-20">

    <div className="mb-10 text-center">

        <h2 className="text-3xl font-bold text-slate-800">
            Sản Phẩm Liên Quan
        </h2>

        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>

        <p className="mt-4 text-slate-500">
            Những sản phẩm cùng danh mục với sản phẩm bạn đang xem
        </p>

    </div>

    {relatedProducts.length > 0 ? (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                />
            ))}
        </div>

    ) : (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <p className="text-slate-500">
                Chưa có sản phẩm liên quan
            </p>
        </div>

    )}

</section>

<div className="h-24"></div>

                </div>
            </section>
        </MainLayout>
    );
}

export default ProductDetailPage;