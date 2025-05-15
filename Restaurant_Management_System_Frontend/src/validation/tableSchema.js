import * as yup from "yup";

export const tableSchema = yup.object().shape({
  tableName: yup
    .string()
    .required("Table name is required")
    .min(2, "Table name should be at least 2 characters long")
    .max(50, "Table name should not exceed 50 characters"),
    
  capacity: yup
    .number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1")
    .max(100, "Capacity must not exceed 100")
    .typeError("Capacity must be a number"),
});
