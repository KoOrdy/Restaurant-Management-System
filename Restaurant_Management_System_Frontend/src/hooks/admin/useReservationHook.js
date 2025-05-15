import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchOrderByIdService, fetchReservationByIdService } from "../../services/admin/reservation.services";

const RESERVATIONS_QUERY_KEY = "reservations";
const ORDERS_QUERY_KEY = "orders";

export const useGetReservationById = (id) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [RESERVATIONS_QUERY_KEY, id],
    queryFn: () => fetchReservationByIdService(id, token),
    enabled: !!token && !!id,
  });

  return {
    reservations: data?.data?.reservations || [],
    isLoading,
  };
};


export const useGetOrderById = (id) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [ORDERS_QUERY_KEY, id],
    queryFn: () => fetchOrderByIdService(id, token),
    enabled: !!token && !!id,
  });

  return {
    orders: data?.data?.orders || [],
    isLoading,
  };
};

