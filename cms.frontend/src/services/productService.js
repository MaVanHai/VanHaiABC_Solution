import axiosClient from '../api/axiosClient';


const productService = {
    getAllProducts: async () => {
        try {
            // Thực hiện gọi API GET để lấy danh sách sản phẩm
            const response = await axiosClient.get('/Products');


            // Trả về mảng dữ liệu sản phẩm
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllProducts:", error);
            throw error; // Đẩy lỗi ra ngoài để component ProductGrid bắt được và xử lý giao diện
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosClient.get(`/Products/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getProductById với ID ${id}:`, error);
            throw error;
        }
    }
};


export default productService;
