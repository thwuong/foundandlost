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
    removeMyRequest: (state, actions) => {
      state.myRequests = state.myRequests.filter((request) => request.id !== actions.payload);
    },
    updateStatusPost: (state, actions) => {
      state.myPosts = state.myPosts.map((post) => {
        if (post.id === actions.payload) {
          post.status = "comfirmed";
        }
        return post;
      });
    },
  },
});

export const { saveProfile, changeProfile, saveProfilePosts, saveProfileRequets, removeMyRequest, updateStatusPost } =
  userSlice.actions;
export default userSlice.reducer;
