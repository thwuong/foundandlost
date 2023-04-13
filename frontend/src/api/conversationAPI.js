import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
import {
  saveConversations,
  addConversation,
  saveConversationAfterDelete,
} from "../stores/ConversationSlice";
export const createConversation = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/conversation/", payload);
    dispatch(addConversation(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getConversationList = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/conversation/`);
    dispatch(saveConversations(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteConversation = async (dispatch, conversationId) => {
  try {
    const data = await axiosClient.get(`/api/conversation/${conversationId}`);
    dispatch(saveConversationAfterDelete(conversationId));
  } catch (error) {
    showStoats("error", error.message);
  }
};
