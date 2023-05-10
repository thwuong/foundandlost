import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
import { saveProfileRequets, removeMyRequest, updateStatusPost } from "../stores/UserSlice";
import { saveRequests, addRequest, updateRequest } from "../stores/RequestSlice";
export const postRequest = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/request/", payload);
    dispatch(addRequest(data));
    showStoats("success", data.message);
    return data;
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteRequest = async (dispatch, requestId) => {
  try {
    const data = await axiosClient.delete(`/api/request/${requestId}`);
    dispatch(removeMyRequest(requestId));
    showStoats("success", data.message);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editStatusRequest = async (dispatch, payload, requestId) => {
  try {
    console.log(payload);
    const data = await axiosClient.put(`/api/request/${requestId}`, payload);
    dispatch(updateRequest({ ...payload, requestId }));
    const { status, postId } = payload;
    if (status === "accepted") {
      dispatch(updateStatusPost(postId));
    }
    showStoats("success", data.message);
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
    dispatch(saveProfileRequets(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getRequestList = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/request/`);
    dispatch(saveRequests(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
