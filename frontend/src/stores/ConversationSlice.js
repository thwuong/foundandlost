import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
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
    chooseConversation: (state, actions) => {
      state.selectedConversation = state.conversations.filter(
        (conversation) => conversation.id === actions.payload
      );
    },
  },
});

export const { saveConversations, addConversation, chooseConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
