import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllMenuItemsService,
  fetchMenuItemByIdService,
  createMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
  uploadMenuItemPhotoService
} from "../../services/manager/menuItem.services";
import { showToast } from "../../utils/";

const MENU_ITEMS_QUERY_KEY = "menu-items";

// Fetch all menu items
const useGetAllMenuItems = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [MENU_ITEMS_QUERY_KEY],
    queryFn: () => fetchAllMenuItemsService(token),
    enabled: !!token,
  });

  return {
    menuItems: data?.data.menuItems || [],
    isLoading,
  };
};

// Fetch a single menu item by ID
const useGetMenuItemById = (id) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [MENU_ITEMS_QUERY_KEY, id],
    queryFn: () => fetchMenuItemByIdService(id, token),
    enabled: !!token && !!id,
  });

  return {
    menuItem: data?.data.menuItem || null,
    isLoading,
  };
};

// Manage add, update, delete
const useManageMenuItems = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data) => createMenuItemService(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MENU_ITEMS_QUERY_KEY] });
      showToast("success", "Menu item created successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateMenuItemService(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MENU_ITEMS_QUERY_KEY] });
      showToast("success", "Menu item updated successfully");
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
    mutationFn: (id) => deleteMenuItemService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MENU_ITEMS_QUERY_KEY] });
      showToast("success", "Menu item deleted successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: ({ id, formData }) => uploadMenuItemPhotoService(id, formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MENU_ITEMS_QUERY_KEY] });
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
    addMenuItem: addMutation.mutate,
    isAdding: addMutation.isPending,

    updateMenuItem: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deleteMenuItem: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    uploadPhoto: uploadPhotoMutation.mutate,
    isUploadingPhoto: uploadPhotoMutation.isPending,
  };
};

export {
  useGetAllMenuItems,
  useGetMenuItemById,
  useManageMenuItems,
};
