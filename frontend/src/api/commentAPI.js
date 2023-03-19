import axiosClient from "./axiosClient";
import showStoats from "../utils/showToast";
import {
  addComment,
  saveComments,
  removeComment,
  updateComment,
} from "../stores/CommentSlice";
export const postComment = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post("/api/comment/", payload);
    dispatch(addComment(data));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const deleteComment = async (dispatch, commentId) => {
  try {
    const data = await axiosClient.delete(`/api/comment/${commentId}`);
    dispatch(removeComment(commentId));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const editComment = async (dispatch, payload, commentId) => {
  try {
    const data = await axiosClient.put(`/api/comment/${commentId}`, payload);

    dispatch(editComment({ ...payload, commentId }));
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getCommentList = async (dispatch, commentId) => {
  try {
    const data = await axiosClient.get(`/api/comment/${commentId}`);
    dispatch(saveComments(data));
  } catch (error) {
    showStoats("error", error.message);
  }
};
export const getComment = async (dispatch, commentId) => {
  try {
    const data = await axiosClient.get(`/api/comment/${commentId}`);
    // dispatch
    showStoats("success", data);
  } catch (error) {
    showStoats("error", error.message);
  }
};
