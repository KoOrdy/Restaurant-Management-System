import axiosInstance from "../../config/axios.config";

export const makeOrderService = async (restaurantId, reservationId, orderItems, token) => {
  try {
    const response = await axiosInstance.post(
      `/Customer/restaurants/${restaurantId}/reservations/${reservationId}/MakeOrder`,
      { orderItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const cancelOrderService = async (orderId, token) => {
  try {
    const response = await axiosInstance.put(
      `/Customer/CancelOrder/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
