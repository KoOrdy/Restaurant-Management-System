import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/";
import { 
  approveRestaurantService,
  createRestaurantService,
  deleteRestaurantService,
  fetchAllRestaurantsService,
  fetchRestaurantByIdService,
  rejectRestaurantService,
  updateRestaurantService,
  uploadRestaurantPhotoService
} from "../../services/admin/restaurant.services";

const RESTAURANTS_QUERY_KEY = "restaurants";

// Fetch all restaurants
const useGetAllRestaurants = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [RESTAURANTS_QUERY_KEY],
    queryFn: () => fetchAllRestaurantsService(token),
    enabled: !!token,
  });

  return {
    restaurants: data?.data.restaurants || [],
    isLoading,
  };
};

// Fetch single restaurant by ID
const useGetRestaurantById = (id) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [RESTAURANTS_QUERY_KEY, id],
    queryFn: () => fetchRestaurantByIdService(id, token),
    enabled: !!token && !!id,
  });
  
  return {
    restaurant: data?.data?.restaurant || null,
    isLoading,
  };
};

// Manage restaurant actions
const useManageRestaurants = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data) => createRestaurantService(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Restaurant created successfully");
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

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteRestaurantService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Restaurant deleted successfully");
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

  const approveMutation = useMutation({
    mutationFn: (id) => approveRestaurantService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Restaurant approved successfully");
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

  const rejectMutation = useMutation({
    mutationFn: (id) => rejectRestaurantService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Restaurant rejected successfully");
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

  const updateMutation = useMutation({
    mutationFn: (data) => updateRestaurantService(data.id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Restaurant updated successfully");
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

  const uploadPhotoMutation = useMutation({
    mutationFn: ({ id, formData }) => uploadRestaurantPhotoService(id, formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTAURANTS_QUERY_KEY] });
      showToast("success", "Photo uploaded successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          showToast("error", err);
        });
      } else {
        showToast("error", "Failed to upload photo. Please try again.");
      }
    },
  });
  

  return {
    addRestaurant: addMutation.mutate,
    isAdding: addMutation.isPending,

    deleteRestaurant: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    approveRestaurant: approveMutation.mutate,
    isApproving: approveMutation.isPending,

    rejectRestaurant: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,

    updateRestaurant: updateMutation.mutate,
    isUpdating: updateMutation.isLoading,

    uploadPhoto: uploadPhotoMutation.mutate,
    isUploadingPhoto: uploadPhotoMutation.isPending,

  };
};

export {
  useGetAllRestaurants,
  useGetRestaurantById,
  useManageRestaurants,
};
