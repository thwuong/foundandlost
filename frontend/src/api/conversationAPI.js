import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
export const createConversation = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/conversation/", payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getConversation = async (dispatch, conversationId) => {
  try {
    const data = await axiosClient.get(`/api/conversation/${conversationId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getConversationList = async (dispatch, params) => {
  try {
    const data = await axiosClient.get(`/api/conversation/`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};