import axiosInstance from "../../config/axios.config";

// Get all reservations (for manager)
export const fetchManagerReservationsService = async (token) => {
  try {
    const response = await axiosInstance.get("/manager/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Accept a reservation
export const acceptReservationService = async (id, token) => {
  try {
    const response = await axiosInstance.put(
      `/manager/reservations/accept/${id}`,
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

// Reject a reservation
export const rejectReservationService = async (id, token) => {
  try {
    const response = await axiosInstance.put(
      `/manager/reservations/reject/${id}`,
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

// Mark all past reservations as finished
export const markAllPastReservationsFinishedService = async (token) => {
  try {
    const response = await axiosInstance.put(
      `/manager/reservations/mark-finished`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
