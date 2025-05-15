import axiosInstance from "../../config/axios.config";

export const fetchUsersByRoleService = async (role, token) => {
  try {
    const response = await axiosInstance.get("/admin/users", {
      params: { role },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUserService = async (id, name, email, token) => {
  try {
    const response = await axiosInstance.put(
      `/admin/users/${id}`,
      { name, email },
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

export const deleteUserService = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};