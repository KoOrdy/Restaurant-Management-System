import axiosInstance from "../../config/axios.config";

// Fetch reservation by ID
export const fetchReservationByIdService = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/admin/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const fetchOrderByIdService = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/admin/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};