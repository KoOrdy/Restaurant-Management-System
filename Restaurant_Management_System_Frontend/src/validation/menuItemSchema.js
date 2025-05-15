import * as yup from "yup";

export const menuItemSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters long")
    .max(100, "Name should not exceed 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description should be at least 5 characters long")
    .max(500, "Description should not exceed 500 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),

  availability: yup
    .boolean()
    .required("Availability status is required"),

  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .min(1, "Invalid category"),
});
