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
      state.messageList = [...state.messageList, actions.payload.messageItem];
    },
    recevierMessage: (state, actions) => {
      state.messageList = [...state.messageList, actions.payload];
    },
  },
});

export const { saveMessages, addMessage, recevierMessage } =
  messageSlice.actions;
export default messageSlice.reducer;
