import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters long")
    .max(50, "Name should not exceed 50 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});
