import * as yup from "yup";

export const rescheduleReservationSchema = yup.object().shape({
  newReservationDate: yup
    .date()
    .required("New reservation date is required"),

  newStartTime: yup
    .string()
    .required("New start time is required"),
});
