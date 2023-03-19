import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    myPosts: [],
    myRequests: [],
  },
  reducers: {
    // Actions
    saveProfile: (state, actions) => {
      state.profile = actions.payload.user;
    },
    changeProfile: (state, actions) => {
      state.profile = actions.payload.newUser;
    },
    saveProfilePosts: (state, actions) => {
      state.myPosts = actions.payload.posts;
    },
    saveProfileRequets: (state, actions) => {
      state.myRequests = actions.payload.requests;
    },
  },
});

export const {
  saveProfile,
  changeProfile,
  saveProfilePosts,
  saveProfileRequets,
} = userSlice.actions;
export default userSlice.reducer;
