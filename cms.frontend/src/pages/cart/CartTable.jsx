
import React from "react";

const IMAGE_BASE_URL = "https://localhost:7218";

function CartTable({
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    onCheckout
}) {

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const getTotal = () => {
        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead className="bg-slate-100">
                    <tr>
                        <th className="p-4 text-left">
                            Sản phẩm
                        </th>

                        <th className="p-4">
                            Giá
                        </th>

                        <th className="p-4">
                            Số lượng
                        </th>

                        <th className="p-4">
                            Thành tiền
                        </th>

                        <th className="p-4">
                            Xóa
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {cartItems.map((item) => (

                        <tr
                            key={item.id}
                            className="border-t"
                        >
                            <td className="p-4">

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
                                            Tồn kho: {item.stockQuantity}
                                          </p>
                                    </div>

                                </div>

                            </td>

                            <td className="text-center">
                                {formatCurrency(
                                    item.price
                                )}
                            </td>

                            <td>

                                <div className="flex justify-center">

                                    <button
                                        onClick={() =>
                                            decreaseQty(
                                                item.id
                                            )
                                        }
                                        className="h-9 w-9 rounded-l border"
                                    >
                                        -
                                    </button>

                                    <div className="flex h-9 w-12 items-center justify-center border-t border-b">
                                        {item.quantity}
                                    </div>

                                    <button
                                        onClick={() =>
                                            increaseQty(item.id)
                                        }
                                        disabled={
                                            item.quantity >=
                                            item.stockQuantity
                                        }
                                        className={`h-9 w-9 rounded-r border ${
                                            item.quantity >= item.stockQuantity
                                                ? "cursor-not-allowed bg-slate-200"
                                                : ""
                                        }`}
                                    >
                                        +
                                    </button>

                                </div>

                            </td>

                            <td className="text-center font-bold text-red-500">
                                {formatCurrency(
                                    item.price *
                                        item.quantity
                                )}
                            </td>

                            <td className="text-center">

                                <button
                                    onClick={() =>
                                        removeItem(
                                            item.id
                                        )
                                    }
                                    className="rounded bg-red-500 px-3 py-2 text-white"
                                >
                                    Xóa
                                </button>

                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="border-t p-6">

                <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold text-red-500">
                        Tổng cộng: {formatCurrency(getTotal())}
                    </h3>

                    <button
                        onClick={onCheckout}
                        className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
                    >
                        Thanh toán
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CartTable;