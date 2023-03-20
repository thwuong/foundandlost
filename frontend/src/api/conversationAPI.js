import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
import {
  saveConversations,
  addConversation,
} from "../stores/ConversationSlice";
export const createConversation = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/conversation/", payload);
    dispatch(addConversation(data));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getConversationList = async (dispatch, params) => {
  try {
    const data = await axiosClient.get(`/api/conversation/`);
    dispatch(saveConversations(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
