import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService, logout as logoutService } from "../../services/authServices";

// Estado inicial
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async Thunks
export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await loginService(email, password);
    if (!res) return rejectWithValue("email o contraseña inválidos");
    return res;
  } catch (error) {
    return rejectWithValue(error?.response?.data || error?.message || "Error en login");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutService();
});

// Reducer con Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
