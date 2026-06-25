import axiosClient from "../api/axiosClient";

const orderService = {

    /**
     * Tạo đơn hàng mới
     * API: POST /api/Orders
     */
    createOrder: async (orderData) => {
        try {
            const response = await axiosClient.post(
                "/Orders",
                orderData
            );

            return response.data || response;

        } catch (error) {

            console.error(
                "Lỗi API createOrder:",
                error
            );

            throw error;
        }
    },

    /**
     * Lấy danh sách đơn hàng của khách hàng
     * API: GET /api/Orders/customer/{customerId}
     */
    getMyOrders: async (customerId) => {
        try {

            const response =
                await axiosClient.get(
                    `/Orders/customer/${customerId}`
                );

            return response.data || response;

        } catch (error) {

            console.error(
                "Lỗi API getMyOrders:",
                error
            );

            throw error;
        }
    },

    /**
     * Lấy chi tiết đơn hàng
     * API: GET /api/Orders/{id}
     */
    getOrderDetail: async (orderId) => {
        try {

            const response =
                await axiosClient.get(
                    `/Orders/${orderId}`
                );

            return response.data || response;

        } catch (error) {

            console.error(
                "Lỗi API getOrderDetail:",
                error
            );

            throw error;
        }
    }
};

export default orderService;