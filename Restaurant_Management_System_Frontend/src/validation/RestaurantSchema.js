import * as yup from "yup";

export const getRestaurantSchema = (isUpdate) =>
  yup.object().shape({
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
      .when([], {
        is: () => !isUpdate, // If it's not an update, manager name is required
        then: (schema) =>
          schema
            .required("Manager name is required")
            .min(2, "Manager name should be at least 2 characters long")
            .max(50, "Manager name should not exceed 50 characters"),
        otherwise: (schema) => schema.strip(), // Strip if it's an update
      }),

    managerEmail: yup
      .string()
      .email("Please enter a valid email address")
      .when([], {
        is: () => !isUpdate, // If it's not an update, manager email is required
        then: (schema) => schema.required("Manager email is required"),
        otherwise: (schema) => schema.strip(), // Strip if it's an update
      }),

    password: yup
      .string()
      .when([], {
        is: () => !isUpdate, // If it's not an update, password is required
        then: (schema) => schema.required("Password is required").min(6, "Password should be at least 6 characters long"),
        otherwise: (schema) => schema.strip(), // Strip if it's an update
      }),

    confirmPassword: yup
      .string()
      .when("password", {
        is: (password) => !!password, // If password is present, confirmPassword must match
        then: (schema) =>
          schema
            .required("Confirm password is required")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        otherwise: (schema) => schema.strip(),
      }),
  });
