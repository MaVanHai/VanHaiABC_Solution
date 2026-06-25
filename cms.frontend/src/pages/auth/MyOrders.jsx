import React, {
    useEffect,
    useState
} from "react";

import {
    Link,
    Navigate
} from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import orderService from "../../services/orderService";

const IMAGE_BASE_URL =
    "https://localhost:7218";

function MyOrders() {

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );

    const [orders, setOrders] =
        useState([]);

    useEffect(() => {

        const loadOrders =
            async () => {

                try {

                    const data =
                        await orderService.getMyOrders(
                            customer.id
                        );

                    setOrders(data);

                } catch (error) {

                    console.error(error);

                }
            };

        if (customer) {
            loadOrders();
        }

    }, [customer]);

    if (!customer) {
        return <Navigate to="/login" />;
    }

    const formatCurrency = (value) => {

        return new Intl.NumberFormat(
            "vi-VN",
            {
                style: "currency",
                currency: "VND"
            }
        ).format(value);
    };

    const getStatus = (status) => {

        switch (status) {

            case 0:
                return (
                    <span className="badge bg-warning text-dark">
                        Chờ duyệt
                    </span>
                );

            case 1:
                return (
                    <span className="badge bg-info">
                        Đang giao
                    </span>
                );

            case 2:
                return (
                    <span className="badge bg-success">
                        Hoàn thành
                    </span>
                );

            default:
                return (
                    <span className="badge bg-secondary">
                        Không xác định
                    </span>
                );
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <Header />

            <div className="container my-4 flex-grow-1">

                <div
                    className="card shadow-sm border-0 p-4"
                    style={{
                        borderRadius: "15px"
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">

                        <h4
                            className="fw-bold m-0"
                            style={{
                                color: "#005088"
                            }}
                        >
                            Lịch Sử Mua Hàng
                        </h4>

                        <span>
                            {customer.fullName}
                        </span>

                    </div>

                    {orders.length === 0 ? (

                        <div className="text-center py-5">

                            <h5>
                                Chưa có đơn hàng nào
                            </h5>

                            <p className="text-muted">
                                Bạn chưa thực hiện giao dịch nào.
                            </p>

                            <Link
                                to="/shop"
                                className="btn btn-primary"
                            >
                                Mua sắm ngay
                            </Link>

                        </div>

                    ) : (

                        orders.map(order => (

                            <div
                                key={order.id}
                                className="card mb-4 border"
                            >

                                <div className="card-header bg-light">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <strong>
                                                Đơn hàng #{order.id}
                                            </strong>

                                            <div className="small text-muted">

                                                {new Date(
                                                    order.orderDate
                                                ).toLocaleString(
                                                    "vi-VN"
                                                )}

                                            </div>

                                        </div>

                                        {getStatus(
                                            order.status
                                        )}

                                    </div>

                                </div>

                                <div className="card-body">

                                    {order.products?.map(
                                        product => (

                                        <div
                                            key={
                                                product.productId
                                            }
                                            className="d-flex align-items-center border-bottom py-3"
                                        >

                                            <img
                                                src={
                                                    IMAGE_BASE_URL +
                                                    product.productImage
                                                }
                                                alt={product.productName}
                                                className="rounded"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover"
                                                }}
                                            />                                            

                                            <div className="ms-3 flex-grow-1">

                                                <h6 className="mb-1">
                                                    {
                                                        product.productName
                                                    }
                                                </h6>

                                                <small className="text-muted">
                                                    Số lượng:
                                                    {" "}
                                                    {
                                                        product.quantity
                                                    }
                                                </small>

                                            </div>

                                            <div>

                                                <strong>
                                                    {formatCurrency(
                                                        product.unitPrice
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    ))}

                                    <div className="mt-3 text-end">

                                        <h5 className="text-danger">

                                            Tổng tiền:
                                            {" "}
                                            {formatCurrency(
                                                order.totalAmount
                                            )}

                                        </h5>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            <Footer />

        </div>
    );
}

export default MyOrders;