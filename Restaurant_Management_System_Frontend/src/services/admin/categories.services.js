import axiosInstance from "../../config/axios.config";

export const fetchAllCategoriesService = async (token) => {
  try {
    const response = await axiosInstance.get("/categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const createCategoryService = async (categoryName, token) => {
  try {
    const response = await axiosInstance.post(
      "/admin/categories",
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error.response?.data || error;
  }
};

export const deleteCategoryService = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateCategoryService = async (id, name, token) => {
  try {
    const response = await axiosInstance.put(
      `/admin/categories/${id}`,
      { name },
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