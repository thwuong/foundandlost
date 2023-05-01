import axiosClient from "./axiosClient";
import showToast from "../utils/showToast";
import {
  saveConversations,
  addConversation,
  saveConversationAfterDelete,
  selectConversation,
} from "../stores/ConversationSlice";
export const createConversation = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/conversation/", payload);
    dispatch(addConversation(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getConversation = async (dispatch, senderId) => {
  try {
    const data = await axiosClient.get(`/api/conversation/${senderId}`);
    await dispatch(selectConversation(data.conversation.id));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getConversationList = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/conversation/`);
    dispatch(saveConversations(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const deleteConversation = async (dispatch, conversationId) => {
  try {
    const data = await axiosClient.delete(`/api/conversation/${conversationId}`);
    dispatch(saveConversationAfterDelete(conversationId));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
