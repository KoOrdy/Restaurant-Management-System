import axiosInstance from "../../config/axios.config";

// Get all tables
export const fetchAllTablesService = async (token) => {
  try {
    const response = await axiosInstance.get("/manager/tables", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new table
export const createTableService = async (data, token) => {
  try {
    const response = await axiosInstance.post("/manager/tables", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a table
export const deleteTableService = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/manager/tables/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
