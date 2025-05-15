import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating should be at least 1")
    .max(5, "Rating should not exceed 5"),

  comment: yup
    .string()
    .required("Comment is required")
    .min(10, "Comment should be at least 10 characters long")
    .max(500, "Comment should not exceed 500 characters"),
});
