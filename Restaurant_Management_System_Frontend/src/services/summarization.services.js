import axios from "axios";

export const summarizeReviewsService = async (reviews, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/restaurant_summary", // ✅ Corrected endpoint
      { reviews },
      {
        headers: {
          Authorization: `Bearer ${token}`, // optional — your backend doesn't require it
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
