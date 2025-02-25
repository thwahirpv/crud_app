import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import {
  ACCESS_TOKEN,
  PROFILE,
  REFRESH_TOKEN,
  USERNAME,
} from "../constants/token";

const userRegistration = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("register/", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Registration failed!" }
      );
    }
  }
);

const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("token/", userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Login failed!";
      return rejectWithValue(errorMessage);
    }
  }
);

const createUser = createAsyncThunk(
  "createUser/user",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("users/", userData);
      return response.data;
    } catch (err) {
        return rejectWithValue(
            err.response?.data || { message: "Registration failed!" }
        ); 
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(USERNAME);
      localStorage.removeItem(PROFILE);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { userLogout } = authSlice.actions;
export { userRegistration, userLogin, createUser};
