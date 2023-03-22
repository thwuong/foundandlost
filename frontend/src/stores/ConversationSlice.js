import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    currentConversation: {},
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
      state.currentConversation = actions.payload.conversation;
    },
    selectConversation: (state, actions) => {
      state.currentConversation = state.conversations.find(
        (conversation) => conversation.id === actions.payload
      );
    },
    unSelectConversation: (state) => {
      state.currentConversation = null;
    },
  },
});

export const {
  saveConversations,
  addConversation,
  selectConversation,
  unSelectConversation,
} = conversationSlice.actions;
export default conversationSlice.reducer;
