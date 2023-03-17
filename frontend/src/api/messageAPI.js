import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
export const postMessage = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/message/", payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMessageList = async (dispatch, conversationId) => {
  try {
    const data = await axiosClient.get(`/api/message/${conversationId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
