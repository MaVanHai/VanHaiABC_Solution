import React, {
    useEffect,
    useState
} from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import { useNavigate } from "react-router-dom";
function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] =
        useState([]);

    useEffect(() => {

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCartItems(cart);

    }, []);

    const saveCart = (newCart) => {

        setCartItems(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

const increaseQty = (id) => {

    const newCart = cartItems.map((item) => {

        if (item.id === id) {

            if (
                item.quantity >=
                item.stockQuantity
            ) {
                return item;
            }

            return {
                ...item,
                quantity: item.quantity + 1
            };
        }

        return item;
    });

    saveCart(newCart);
};

const handleCheckout = () => {

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );

    if (!customer) {

        alert(
            "Vui lòng đăng nhập trước khi thanh toán"
        );

        navigate("/login");

        return;
    }

    navigate("/checkout");
};
    const decreaseQty = (id) => {

        const newCart = cartItems.map(
            (item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max(
                              1,
                              item.quantity - 1
                          ),
                      }
                    : item
        );

        saveCart(newCart);
    };

    const removeItem = (id) => {

        const newCart =
            cartItems.filter(
                (item) => item.id !== id
            );

        saveCart(newCart);
    };

    return (
        <>
            <Header />

            <section className="min-h-screen bg-slate-50 py-10">

                <div className="mx-auto max-w-7xl px-4">

                    <h1 className="mb-8 text-4xl font-bold">
                        Giỏ hàng
                    </h1>

                    {cartItems.length === 0 ? (

                        <div className="rounded-2xl bg-white p-10 text-center shadow">

                            <h2 className="text-2xl font-semibold text-slate-700">
                                Giỏ hàng đang trống
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Hãy chọn thêm sản phẩm để tiếp tục mua sắm.
                            </p>

                            <Link
                                to="/shop"
                                className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                            >
                                Tiếp tục mua sắm
                            </Link>

                        </div>

                    ) : (

                        <CartTable
                            cartItems={cartItems}
                            increaseQty={
                                increaseQty
                            }
                            decreaseQty={
                                decreaseQty
                            }
                            removeItem={
                                removeItem
                            }
                            onCheckout={handleCheckout}
                        />

                    )}

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Cart;