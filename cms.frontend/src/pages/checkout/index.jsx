import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import orderService from "../../services/orderService";
const IMAGE_BASE_URL = "https://localhost:7218";

function Checkout() {

    const navigate = useNavigate();

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const total = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat(
            "vi-VN",
            {
                style: "currency",
                currency: "VND"
            }
        ).format(value);
    };

    const handleOrder = async () => {

        try {

            const orderData = {

                customerId: customer.id,

                notes: "",

                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            const response =
                await orderService.createOrder(
                    orderData
                );

            alert(
                "Đặt hàng thành công. Mã đơn hàng #" +
                response.orderId
            );

            localStorage.removeItem("cart");

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            navigate("/my-orders");

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                "Đặt hàng thất bại"
            );
        }
    };

    return (
        <>
            <Header />

            <section className="min-h-screen bg-slate-50 py-10">

                <div className="mx-auto max-w-7xl px-4">

                    <h1 className="mb-8 text-4xl font-bold">
                        Thanh toán đơn hàng
                    </h1>

                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* THÔNG TIN KHÁCH HÀNG */}
                        <div className="lg:col-span-1">

                            <div className="rounded-2xl bg-white p-6 shadow">

                                <h2 className="mb-4 text-xl font-bold">
                                    Thông tin khách hàng
                                </h2>

                                <div className="space-y-3">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Họ tên
                                        </p>

                                        <p className="font-semibold">
                                            {customer.fullName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Email
                                        </p>

                                        <p className="font-semibold">
                                            {customer.email}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Số điện thoại
                                        </p>

                                        <p className="font-semibold">
                                            {customer.phone ||
                                                "Chưa cập nhật"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Địa chỉ giao hàng
                                        </p>

                                        <p className="font-semibold">
                                            {customer.address ||
                                                "Chưa cập nhật"}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* DANH SÁCH SẢN PHẨM */}
                        <div className="lg:col-span-2">

                            <div className="rounded-2xl bg-white p-6 shadow">

                                <h2 className="mb-4 text-xl font-bold">
                                    Sản phẩm đặt mua
                                </h2>

                                <div className="space-y-4">

                                    {cart.map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between border-b pb-4"
                                        >

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={
                                                        IMAGE_BASE_URL +
                                                        item.imageUrl
                                                    }
                                                    alt={item.name}
                                                    className="h-20 w-20 rounded-xl object-cover"
                                                />

                                                <div>

                                                    <h4 className="font-semibold">
                                                        {item.name}
                                                    </h4>

                                                    <p className="text-sm text-slate-500">
                                                        Số lượng:
                                                        {" "}
                                                        {item.quantity}
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        Đơn giá:
                                                        {" "}
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="text-right">

                                                <p className="font-bold text-red-500">
                                                    {formatCurrency(
                                                        item.price *
                                                            item.quantity
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="mt-6 border-t pt-6">

                                    <div className="flex items-center justify-between">

                                        <span className="text-lg font-semibold">
                                            Tổng thanh toán
                                        </span>

                                        <span className="text-3xl font-bold text-red-500">
                                            {formatCurrency(
                                                total
                                            )}
                                        </span>

                                    </div>

                                        <button
                                            onClick={handleOrder}
                                            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 text-white"
                                        >
                                            Xác nhận đặt hàng
                                        </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Checkout;