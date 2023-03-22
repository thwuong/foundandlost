import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
export const postMessage = async (payload) => {
  try {
    const data = await axiosClient.post("/api/message/", payload);
    showStoats("success", data.message);
    return data;
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMessageList = async (conversationId) => {
  try {
    const data = await axiosClient.get(`/api/message/${conversationId}`);
    return data;
  } catch (error) {
    showStoats("error", error.message);
  }
};
