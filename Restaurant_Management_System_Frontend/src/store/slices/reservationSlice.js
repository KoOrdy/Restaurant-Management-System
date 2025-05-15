import { createSlice } from "@reduxjs/toolkit";


const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    isOpenCustomerSidebar: false, // Add the sidebar state here
  },
  reducers: {
    // Action to toggle the sidebar visibility
    toggleCustomerSidebar: (state) => {
      state.isOpenCustomerSidebar = !state.isOpenCustomerSidebar;
    },
  },
});

// Export the action to toggle the sidebar
export const { toggleCustomerSidebar } = reservationSlice.actions;

export default reservationSlice.reducer;
