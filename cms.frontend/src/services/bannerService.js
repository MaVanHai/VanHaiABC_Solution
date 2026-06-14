import axiosClient from "../api/axiosClient";

const bannerService = {
    /**
     * 1. Lấy danh sách tất cả banner từ backend
     * API: GET /api/Banners
     */
    getAllBanners: async () => {
        try {
            const response = await axiosClient.get("/Banners");

            // Trả về data (tuỳ axiosClient cấu hình)
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllBanners:", error);
            throw error;
        }
    },

    /**
     * 2. Lấy chi tiết banner theo ID
     * API: GET /api/Banners/{id}
     */
    getBannerById: async (id) => {
        try {
            const response = await axiosClient.get(`/Banners/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getBannerById với ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 3. Tạo banner mới
     * API: POST /api/Banners
     */
    createBanner: async (data) => {
        try {
            const response = await axiosClient.post("/Banners", data);
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API createBanner:", error);
            throw error;
        }
    },

    /**
     * 4. Cập nhật banner
     * API: PUT /api/Banners/{id}
     */
    updateBanner: async (id, data) => {
        try {
            const response = await axiosClient.put(`/Banners/${id}`, data);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API updateBanner ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 5. Xoá banner
     * API: DELETE /api/Banners/{id}
     */
    deleteBanner: async (id) => {
        try {
            const response = await axiosClient.delete(`/Banners/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API deleteBanner ID ${id}:`, error);
            throw error;
        }
    }
};

export default bannerService;