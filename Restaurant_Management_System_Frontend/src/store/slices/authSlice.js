import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services/auth.services";
import { showToast } from "../../utils/";

// Retrieve token and user info from sessionStorage (if any)
const getStoredToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      token,
      userId: decodedToken.id,
      role: decodedToken.role.toLowerCase(),
      user: decodedToken,
    };
  }
  return { token: null, userId: null, role: null, user: null };
};

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginService(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: getStoredToken().token,  // Use the token stored in sessionStorage
    role: getStoredToken().role,
    userId: getStoredToken().userId, // Use the userId stored in sessionStorage
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.userId = null;
      // Clear the token and user data from sessionStorage
      sessionStorage.removeItem("token");
      location.replace("/login")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;

        // Get token from the response
        const token = action.payload.data.token;
        state.token = token;

        // Store token in sessionStorage
        sessionStorage.setItem("token", token);

        // Decode the token to extract user information
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        state.userId = decodedToken.id;  // Extracting the user ID
        state.role = decodedToken.role.toLowerCase();  // Extracting the user role

        state.user = decodedToken; // Optionally store the entire decoded token
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
        showToast("error", "Invaild email or password, please try again.");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
