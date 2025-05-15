import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils";
import { cancelOrderService, makeOrderService } from "../../services/customer/orders.services";

const useManageCustomerOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const makeOrderMutation = useMutation({
    mutationFn: ({ restaurantId, reservationId, orderItems }) =>
      makeOrderService(restaurantId, reservationId, orderItems, token),
    onSuccess: () => {
      showToast("success", "Order placed successfully.");
      queryClient.invalidateQueries(); // optionally: refresh orders/reservations
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Failed to make order.");
      }
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId) => cancelOrderService(orderId, token),
    onSuccess: () => {
      showToast("success", "Order cancelled successfully.");
      queryClient.invalidateQueries(); // optionally: refresh orders/reservations
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Failed to cancel order.");
      }
    },
  });

  return {
    makeOrder: makeOrderMutation.mutate,
    isMakingOrder: makeOrderMutation.isPending,

    cancelOrder: cancelOrderMutation.mutate,
    isCancellingOrder: cancelOrderMutation.isPending,
  };
};

export { useManageCustomerOrders };
