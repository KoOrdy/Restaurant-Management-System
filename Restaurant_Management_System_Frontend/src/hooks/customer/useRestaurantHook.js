import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils";
import { 
  fetchAllRestaurantsForCustomerService,
  fetchRestaurantByIdForCustomerService,
  addReviewToRestaurantService,
  fetchRestaurantManagersService,
  fetchReviewsForRestaurantService
} from "../../services/customer/restaurant.services";

const RESTAURANTS_QUERY_KEY = "restaurants";
const MANAGERS_QUERY_KEY = "restaurantManagers";

// Fetch all restaurants for the customer
const useGetAllRestaurantsForCustomer = () => {
  const { data, isLoading } = useQuery({
    queryKey: [RESTAURANTS_QUERY_KEY],
    queryFn: () => fetchAllRestaurantsForCustomerService(),
  });

  return {
    restaurants: data?.data.restaurants || [],
    isLoading,
  };
};

// Fetch single restaurant by ID for the customer
const useGetRestaurantByIdForCustomer = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: [RESTAURANTS_QUERY_KEY, id],
    queryFn: () => fetchRestaurantByIdForCustomerService(id),
  });

  return {
    categories: data?.data?.categories || null,
    isLoading,
  };
};

// Fetch all restaurant managers for the customer
const useGetRestaurantManagersForCustomer = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [MANAGERS_QUERY_KEY],
    queryFn: () => fetchRestaurantManagersService(token),
    enabled: !!token,
  });

  return {
    managers: data?.data || [],
    isLoading,
  };
};

// Fetch all reviews for a specific restaurant
const useGetRestaurantReviews = (restaurantId) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurantReviews", restaurantId],
    queryFn: () => fetchReviewsForRestaurantService(restaurantId, token),
    enabled: !!restaurantId,
  });

  return {
    reviews: data?.data?.reviews || [],
    isLoading,
  };
};


// Manage review actions
const useManageRestaurantReviews = () => {
  const { token } = useSelector((state) => state.auth);

  const addReviewMutation = useMutation({
    mutationFn: (reviewData) => addReviewToRestaurantService(reviewData.restaurantId, reviewData, token),
    onSuccess: () => {
      showToast("success", "Review added successfully");
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
    addReview: addReviewMutation.mutate,
    isAddingReview: addReviewMutation.isPending,
  };
};

export {
  useGetAllRestaurantsForCustomer,
  useGetRestaurantByIdForCustomer,
  useManageRestaurantReviews,
  useGetRestaurantManagersForCustomer,
  useGetRestaurantReviews
};
