import React from "react";
import ProductCard from "../../components/ProductCard";

function ProductList({ products }) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}

export default ProductList;