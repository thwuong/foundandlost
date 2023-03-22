import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    saveSocket: (state, actions) => {
      state.socket = actions.payload;
    },
  },
});

export const { saveSocket } = socketSlice.actions;
export default socketSlice.reducer;
