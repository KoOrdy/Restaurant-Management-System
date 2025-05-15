import * as yup from "yup";

export const makeReservationSchema = yup.object().shape({
  tableId: yup
    .number()
    .required("Table ID is required")
    .min(1, "Invalid table ID"),

  reservationDate: yup
    .date()
    .required("Reservation date is required"),

  startTime: yup
    .string()
    .required("Start time is required"),
});
