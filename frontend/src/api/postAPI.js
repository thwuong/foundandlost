import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
import {
  savePostList,
  savePostItem,
  addNewPost,
  removePost,
  updatePost,
} from "../stores/PostSlice";
import { saveProfilePosts } from "../stores/UserSlice";

export const postItem = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/post/", payload);
    dispatch(addNewPost(data));
    showStoats("success", data.message);
    return data;
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.delete(`/api/post/${postId}`);
    dispatch(removePost(postId));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editStatusItem = async (dispatch, payload, postId) => {
  try {
    const data = await axiosClient.put(`/api/post/${postId}/status`, payload);
    dispatch(updatePost({ ...payload, postId }));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.get(`/api/post/${postId}`);
    dispatch(savePostItem(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getMyItems = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/post/mypost`);
    dispatch(saveProfilePosts(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getUserItems = async (dispatch, userId) => {
  try {
    const data = await axiosClient.get(`/api/post/${userId}/user`);
    dispatch(saveProfilePosts(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getItemList = async (dispatch, params) => {
  try {
    const data = await axiosClient.get(`/api/post/`, { params });
    dispatch(savePostList(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteComfirmedItem = async (dispatch, postId) => {
  try {
    const data = await axiosClient.delete(`/api/post/${postId}/confirmed`);
    dispatch(removePost(postId));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};

export const editItem = async (dispatch, postId, payload) => {
  try {
    const data = await axiosClient.put(`/api/post/${postId}`, payload);
    showStoats("success", data.message);
    return data;
  } catch (error) {
    showStoats("error", error.message);
  }
};
