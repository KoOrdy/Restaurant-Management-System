import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reservationReducer from "./slices/reservationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
  },
});

export default store;
