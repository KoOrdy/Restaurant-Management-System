// src/validation/orderStatusSchema.js
import * as yup from "yup";

export const orderStatusSchema = yup.object().shape({
  newStatus: yup
    .string()
    .required("Order status is required")
    .oneOf(["Pending", "Preparing", "Ready", "Delivered"], "Invalid order status"),
});
