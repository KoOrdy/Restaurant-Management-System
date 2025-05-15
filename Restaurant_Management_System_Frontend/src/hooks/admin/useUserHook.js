import { useSelector } from "react-redux";
import { deleteUserService, fetchUsersByRoleService, updateUserService } from "../../services/admin/users.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/";

const USERS_QUERY_KEY = "users";

const useGetAllUsers = (role) => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [USERS_QUERY_KEY, role],
    queryFn: () => fetchUsersByRoleService(role, token),
    enabled: !!token && !!role,
  });

  return {
    users: data?.data.users || [],
    isLoading,
  };
};

const useManageUsers = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, name, email }) => updateUserService(id, name, email, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      showToast("success", "User updated successfully");
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
    mutationFn: (id) => deleteUserService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      showToast("success", "User deleted successfully");
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
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export {
  useGetAllUsers,
  useManageUsers,
};
