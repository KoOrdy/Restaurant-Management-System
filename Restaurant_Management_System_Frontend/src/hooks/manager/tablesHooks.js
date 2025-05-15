import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchAllTablesService, 
  createTableService, 
  deleteTableService 
} from "../../services/manager/tables.services";
import { showToast } from "../../utils/";

const TABLES_QUERY_KEY = "tables";

// Hook: Get all tables
const useGetAllTables = () => {
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: [TABLES_QUERY_KEY],
    queryFn: () => fetchAllTablesService(token),
    enabled: !!token,
  });

  return {
    tables: data?.data?.tables || [],
    isLoading,
  };
};

// Hook: Manage table (Create/Delete)
const useManageTables = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  // Add table
  const addMutation = useMutation({
    mutationFn: (data) => createTableService(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TABLES_QUERY_KEY] });
      showToast("success", "Table created successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  // Delete table
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTableService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TABLES_QUERY_KEY] });
      showToast("success", "Table deleted successfully");
    },
    onError: (error) => {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => showToast("error", err));
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    },
  });

  return {
    addTable: addMutation.mutate,
    isAdding: addMutation.isPending,

    deleteTable: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export {
  useGetAllTables,
  useManageTables
};
