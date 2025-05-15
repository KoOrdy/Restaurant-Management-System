import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  makeReservationService,
  rescheduleReservationService,
  deleteReservationService,
  fetchCustomerReservationsService,
} from "../../services/customer/reservations.services";
import { showToast } from "../../utils";

const RESERVATIONS_QUERY_KEY = "customerReservations";

export const useGetCustomerReservations = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [RESERVATIONS_QUERY_KEY],
    queryFn: () => fetchCustomerReservationsService(token),
    enabled: !!token,
  });

  return {
    reservations: data?.data?.reservations || [],
    isLoading,
  };
};

export const useManageReservations = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const makeReservationMutation = useMutation({
    mutationFn: ({ restaurantID, data }) => makeReservationService(restaurantID, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESERVATIONS_QUERY_KEY] });
      showToast("success", "Reservation created successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  const rescheduleMutation = useMutation({
    mutationFn: ({ reservationID, data }) => rescheduleReservationService(reservationID, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESERVATIONS_QUERY_KEY] });
      showToast("success", "Reservation rescheduled successfully");
    },
    onError: (error) => {
      
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reservationID) => deleteReservationService(reservationID, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESERVATIONS_QUERY_KEY] });
      showToast("success", "Reservation deleted successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  return {
    makeReservation: makeReservationMutation.mutate,
    isMaking: makeReservationMutation.isPending,

    rescheduleReservation: rescheduleMutation.mutate,
    isRescheduling: rescheduleMutation.isPending,

    deleteReservation: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
