import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
export const postRequest = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/request/", payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteRequest = async (dispatch, requestId) => {
  try {
    const data = await axiosClient.delete(`/api/request/${requestId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editStatusRequest = async (dispatch, payload, requestId) => {
  try {
    const data = await axiosClient.put(`/api/request/${requestId}`, payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getRequest = async (dispatch, requestId) => {
  try {
    const data = await axiosClient.get(`/api/request/${requestId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMyRequests = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/request/myrequest`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getRequestList = async (dispatch, postId) => {
  try {
    const data = await axiosClient.get(`/api/request/${postId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
