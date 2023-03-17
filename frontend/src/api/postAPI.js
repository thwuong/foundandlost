import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
// import silce
export const postItem = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/post/", payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.delete(`/api/post/${postId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editStatusItem = async (dispatch, payload, postId) => {
  try {
    const data = await axiosClient.put(`/api/post/${postId}`, payload);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.get(`/api/post/${postId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMyItems = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/post/mypost`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getItemList = async (dispatch, params) => {
  try {
    const data = await axiosClient.get(`/api/post/`, params);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteComfirmedItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.delete(`/api/post/${postId}/confirmed`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
