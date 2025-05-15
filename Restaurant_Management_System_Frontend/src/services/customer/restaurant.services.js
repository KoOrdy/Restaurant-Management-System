import axiosInstance from "../../config/axios.config";

// Get all restaurants for the customer
export const fetchAllRestaurantsForCustomerService = async () => {
  try {
    const response = await axiosInstance.get("/Customer/restaurants");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get a specific restaurant by ID for the customer
export const fetchRestaurantByIdForCustomerService = async (id) => {
  try {
    const response = await axiosInstance.get(`/Customer/restaurants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Add a review to a restaurant
export const addReviewToRestaurantService = async (restaurantId, reviewData, token) => {
  console.log(reviewData);
  
  try {
    const response = await axiosInstance.post(
      `/Customer/restaurants/${restaurantId}/AddReview`,
      reviewData.review,
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

export const fetchRestaurantManagersService = async (token) => {
  try {
    const response = await axiosInstance.get("/customer/restaurants/managers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all reviews for a specific restaurant for the customer
export const fetchReviewsForRestaurantService = async (restaurantId, token) => {
  try {
    const response = await axiosInstance.get(`/Customer/restaurants/${restaurantId}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
