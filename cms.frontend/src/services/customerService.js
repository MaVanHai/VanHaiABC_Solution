import axiosClient from "../api/axiosClient";

const customerService = {

    login: async (data) => {
        try {

            console.log("Request Login:", data);

            const response =
                await axiosClient.post(
                    "/Customers/login",
                    data
                );

            console.log(
                "Response Login:",
                response
            );

            return response.data;

        } catch (error) {

            console.log(
                "API Login Error:",
                error.response
            );

            throw error;
        }
    },

    register: async (data) => {
        try {

            const response =
                await axiosClient.post(
                    "/Customers/register",
                    data
                );

            return response.data || response;

        } catch (error) {

            console.error(
                "Lỗi API Register:",
                error
            );

            throw error;
        }
    },

};

export default customerService;