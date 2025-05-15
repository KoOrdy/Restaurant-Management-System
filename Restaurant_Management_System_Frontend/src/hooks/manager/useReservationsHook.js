import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchManagerReservationsService, 
  acceptReservationService, 
  rejectReservationService,
  markAllPastReservationsFinishedService
} from "../../services/manager/reservation.services";
import { showToast } from "../../utils";

const MANAGER_RESERVATIONS_QUERY_KEY = "managerReservations";

// Hook to fetch all reservations
export const useGetManagerReservations = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [MANAGER_RESERVATIONS_QUERY_KEY],
    queryFn: () => fetchManagerReservationsService(token),
    enabled: !!token,
  });

  return {
    reservations: data?.data?.reservations || [],
    isLoading,
  };
};

// Hook to manage accepting/rejecting reservations
export const useManageManagerReservations = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: (id) => acceptReservationService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MANAGER_RESERVATIONS_QUERY_KEY] });
      showToast("success", "Reservation accepted successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong while accepting the reservation.");
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => rejectReservationService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MANAGER_RESERVATIONS_QUERY_KEY] });
      showToast("success", "Reservation rejected successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong while rejecting the reservation.");
      }
    },
  });

  const markFinishMutation = useMutation({
    mutationFn: () => markAllPastReservationsFinishedService(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MANAGER_RESERVATIONS_QUERY_KEY] });
      showToast("success", "All past reservations marked as finished.");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Failed to mark reservations as finished.");
      }
    },
  });

  return {
    acceptReservation: acceptMutation.mutate,
    isAccepting: acceptMutation.isPending,

    rejectReservation: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,

    MarkAllReservationsFinished: markFinishMutation.mutate,
    isFinishing: markFinishMutation.isPending,
  };
};
