import axiosInstance from "../../config/axios.config";

export const fetchTablesByRestaurantService = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/tables/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
