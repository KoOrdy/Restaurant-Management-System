import { useSelector } from "react-redux";
import { createCategoryService, deleteCategoryService, fetchAllCategoriesService, updateCategoryService } from "../../services/admin/categories.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/";

const CATEGORIES_QUERY_KEY = "categories";


const useGetAllCategories = () => {
  const { token } = useSelector((state) => state.auth);  // Now inside a component

  const { data, isLoading } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => fetchAllCategoriesService(token),
    enabled: !!token
  });

  return { 
    categories: data?.data.categories || [], 
    isLoading
  };
};

const useManageCategories = () => {
  const { token } = useSelector((state) => state.auth); 
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: ({ name }) => createCategoryService(name,token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      showToast("success", "Category created successfully");
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
    mutationFn: ({ id, name }) => updateCategoryService(id, name, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      showToast("success", "Category updated successfully");
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
    mutationFn: (id) => deleteCategoryService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      showToast("success", "Category deleted successfully");
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
    addCategory: addMutation.mutate,
    isAdding: addMutation.isPending,

    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export {
  useGetAllCategories,
  useManageCategories
}