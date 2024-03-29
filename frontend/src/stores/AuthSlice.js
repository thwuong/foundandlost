import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload.accessToken;
    },
    updateUser: (state, action) => {
      state.user = action.payload.newUser;
    },
  },
});

export const { saveUser, updateToken, clearUser, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
