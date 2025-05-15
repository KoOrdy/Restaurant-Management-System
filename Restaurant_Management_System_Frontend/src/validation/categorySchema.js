import * as yup from "yup";

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name should be at least 2 characters long")
    .max(50, "Category name should not exceed 50 characters"),
});
