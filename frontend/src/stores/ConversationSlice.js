import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
  },
  reducers: {
    saveConversations: (state, actions) => {
      state.conversations = actions.payload.conversations;
    },
    addConversation: (state, actions) => {
      state.conversations = [
        ...state.conversations,
        actions.payload.conversation,
      ];
    },
  },
});

export const { saveConversations, addConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
