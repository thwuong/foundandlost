import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    updateToken: (state, action) => {
      state.token = action.payload.accessToken;
    },
  },
});

export const { login, updateToken } = authSlice.actions;

export default authSlice.reducer;
