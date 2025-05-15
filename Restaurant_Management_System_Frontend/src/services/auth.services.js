import axiosInstance from "../config/axios.config";

export const loginService = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerCustomerService = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/register-customer", {
      name,
      email,
      password,
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const registerManagerService = async (name, description, location, managerName, managerEmail) => {
  try {
    const response = await axiosInstance.post("/register-manager", {
      name,
      description,
      location,
      managerName,
      managerEmail,
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};

