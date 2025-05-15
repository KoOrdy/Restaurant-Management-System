// services/reservations/fetchCustomerReservationsService.js
import axiosInstance from "../../config/axios.config";

export const fetchCustomerReservationsService = async (token) => {
  try {
    const response = await axiosInstance.get("/Customer/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const makeReservationService = async (restaurantID, data, token) => {
  try {
    const response = await axiosInstance.post(
      `/Customer/restaurants/${restaurantID}/MakeReservation`,
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

export const rescheduleReservationService = async (reservationID, data, token) => {
  try {
    const response = await axiosInstance.put(
      `/Customer/reservations/${reservationID}/reschedule`,
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

export const deleteReservationService = async (reservationID, token) => {
  try {
    const response = await axiosInstance.delete(
      `/Customer/reservations/${reservationID}`,
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