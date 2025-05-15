// hooks/customer/useRestaurantTables.js
import { useQuery } from "@tanstack/react-query";
import { fetchTablesByRestaurantService } from "../../services/customer/tables.services";

const RESTAURANT_TABLES_KEY = "restaurant-tables";

export const useRestaurantTables = (restaurantID) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [RESTAURANT_TABLES_KEY, restaurantID],
    queryFn: () => fetchTablesByRestaurantService(restaurantID),
    enabled: !!restaurantID,
  });

  return {
    tables: data?.data?.tables || [], // adjust based on your API response shape
    isLoading,
    error,
  };
};
