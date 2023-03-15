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
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
