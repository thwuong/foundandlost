import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    posts: [],
    requests: [],
  },
  reducers: {
    // Actions
    saveProfile: (state, actions) => {
      state.profile = actions.payload.user;
    },
    changeProfile: (state, actions) => {
      state.profile = actions.payload.newUser;
    },
  },
});

export const { saveProfile, changeProfile } = userSlice.actions;
export default userSlice.reducer;
