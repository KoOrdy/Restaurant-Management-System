import axiosInstance from "../../config/axios.config";

// Get all menu items
export const fetchAllMenuItemsService = async (token) => {
  try {
    const response = await axiosInstance.get("/manager/menu-items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new menu item
export const createMenuItemService = async (data, token) => {
  try {
    const response = await axiosInstance.post("/manager/menu-items", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update an existing menu item
export const updateMenuItemService = async (id, data, token) => {
  try {
    const response = await axiosInstance.put(`/manager/menu-items/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get a menu item by ID
export const fetchMenuItemByIdService = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/manager/menu-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a menu item
export const deleteMenuItemService = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/manager/menu-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Upload menu item photo
export const uploadMenuItemPhotoService = async (id, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `/manager/menu-items/photo/${id}`,
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
