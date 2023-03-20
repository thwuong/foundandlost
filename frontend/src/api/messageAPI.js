import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
import { saveMessages, addMessage } from "../stores/MessageSlice";
export const postMessage = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/message/", payload);
    dispatch(addMessage(data));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMessageList = async (dispatch, conversationId) => {
  try {
    const data = await axiosClient.get(`/api/message/${conversationId}`);
    dispatch(saveMessages(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
