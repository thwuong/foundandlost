import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageList: [],
  },
  reducers: {
    saveMessages: (state, actions) => {
      state.messageList = actions.payload.messages;
    },
    addMessage: (state, actions) => {
      state.messageList = [...state.messageList, actions.payload.message];
    },
  },
});

export const { saveMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
