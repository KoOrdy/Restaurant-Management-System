import axiosInstance from "../../config/axios.config";

/**
 * Fetch all orders for the manager
 */
export const fetchManagerOrdersService = async (token) => {
  try {
    const response = await axiosInstance.get("/manager/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update the status of a specific order
 * @param {number|string} orderId - ID of the order
 * @param {string} newStatus - One of: "Pending", "Preparing", "Ready", "Delivered"
 */
export const updateOrderStatusService = async (orderId, newStatus, token) => {
  try {
    const response = await axiosInstance.put(
      `/manager/orders/${orderId}/status`,
      { newStatus },
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
