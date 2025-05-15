import axiosInstance from "../config/axios.config";

export const fetchChatHistoryService = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/chat/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};
