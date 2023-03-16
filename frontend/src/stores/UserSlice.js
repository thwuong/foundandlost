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
  },
});

export const { saveProfile } = userSlice.actions;
export default userSlice.reducer;
