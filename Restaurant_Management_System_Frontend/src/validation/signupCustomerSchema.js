import * as yup from "yup";

export const signupCustomerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters long")
    .max(50, "Name should not exceed 50 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters long"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref('password'), null], "Passwords must match"),
});
