import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateNewToken: (state, action) => {
      state.token = action.payload.accessToken;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateNewToken } =
  authSlice.actions;

export default authSlice.reducer;
