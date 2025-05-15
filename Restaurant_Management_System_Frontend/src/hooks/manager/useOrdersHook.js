import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils";
import { fetchManagerOrdersService, updateOrderStatusService } from "../../services/manager/order.services";

const MANAGER_ORDERS_QUERY_KEY = "manager-orders";

/**
 * Hook to fetch all orders for the manager
 */
const useGetManagerOrders = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [MANAGER_ORDERS_QUERY_KEY],
    queryFn: () => fetchManagerOrdersService(token),
    enabled: !!token,
  });

  return {
    orders: data?.data?.orders || [],
    isLoading,
  };
};

/**
 * Hook to manage order status updates
 */
const useManageOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }) => updateOrderStatusService(orderId, newStatus, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MANAGER_ORDERS_QUERY_KEY] });
      showToast("success", "Order status updated successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          showToast("error", err);
        });
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  return {
    updateOrderStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};

export {
  useGetManagerOrders,
  useManageOrders
};
