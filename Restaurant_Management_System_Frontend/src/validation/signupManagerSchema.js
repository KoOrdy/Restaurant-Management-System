import * as yup from "yup";

export const signupManagerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Restaurant name is required")
    .min(2, "Restaurant name should be at least 2 characters long")
    .max(100, "Restaurant name should not exceed 100 characters"),

  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location should be at least 2 characters long")
    .max(100, "Location should not exceed 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters long")
    .max(500, "Description should not exceed 500 characters"),

  managerName: yup
    .string()
    .required("Manager name is required")
    .min(2, "Manager name should be at least 2 characters long")
    .max(50, "Manager name should not exceed 50 characters"),

  managerEmail: yup
    .string()
    .required("Manager email is required")
    .email("Please enter a valid email address"),
});
