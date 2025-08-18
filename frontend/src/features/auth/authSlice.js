import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, register as registerApi, forgotPassword as forgotPasswordApi } from "@/services/api";

// Load user from localStorage if available
const storedUser =
  typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await loginApi(credentials);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await registerApi(userData);
    return response;
  }
);

export const forgotPasswordRequest = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await forgotPasswordApi(email);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
