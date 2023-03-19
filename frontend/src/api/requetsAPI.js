import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
import { saveProfileRequets } from "../stores/UserSlice";
import {
  savaRequests,
  removeRequest,
  addRequest,
  updateRequest,
} from "../stores/RequestSlice";
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
    dispatch(removeRequest(requestId));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editStatusRequest = async (dispatch, payload, requestId) => {
  try {
    const data = await axiosClient.put(`/api/request/${requestId}`, payload);
    dispatch(removeRequest({ ...payload, requestId }));

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
    dispatch(saveProfileRequets(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getRequestList = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/request/`);
    // dispatch
    dispatch(saveProfileRequets(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
