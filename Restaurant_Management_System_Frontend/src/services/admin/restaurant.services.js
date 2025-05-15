import axiosInstance from "../../config/axios.config";

// Get all restaurants
export const fetchAllRestaurantsService = async (token) => {
  try {
    const response = await axiosInstance.get("/admin/restaurants", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new restaurant
export const createRestaurantService = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/admin/restaurants",
      data,
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

// Get restaurant by ID
export const fetchRestaurantByIdService = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/admin/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete restaurant by ID
export const deleteRestaurantService = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/admin/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Approve restaurant
export const approveRestaurantService = async (id, token) => {
  try {
    const response = await axiosInstance.put(
      `/admin/restaurant/approve/${id}`,
      {},
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

// Reject restaurant
export const rejectRestaurantService = async (id, token) => {
  try {
    const response = await axiosInstance.put(
      `/admin/restaurant/reject/${id}`,
      {},
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


// Update restaurant details
export const updateRestaurantService = async (id, data, token) => {
  try {
    const response = await axiosInstance.put(
      `/admin/restaurants/${id}`,
      data,
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

// Upload restaurant photo
export const uploadRestaurantPhotoService = async (id, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `/admin/restaurants/photo/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
