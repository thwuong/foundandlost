import axiosClient from "./axiosClient";
import {
  addNotification,
  markNotification,
  saveNotifications,
  removeNotification,
} from "../stores/NotifySlice";
import showToast from "../utils/showToast";

export const getAllNotify = async (dispatch) => {
  try {
    const data = await axiosClient.get(`/api/notification/`);
    dispatch(saveNotifications(data.notifications));
  } catch (error) {
    console.log(error.message);
  }
};
export const pushNotify = async (dispatch, payload) => {
  try {
    const data = await axiosClient.post(`/api/notification/`, payload);
    console.log(data);
    dispatch(addNotification(data.notification));
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteNotify = async (dispatch, notificationId) => {
  try {
    const data = await axiosClient.delete(
      `/api/notification/${notificationId}`
    );
    dispatch(removeNotification(notificationId));
    showToast("success", data.message);
  } catch (error) {
    console.log(error.message);
  }
};
export const readNotify = async (dispatch, notificationId) => {
  try {
    const data = await axiosClient.put(`/api/notification/${notificationId}`);
    dispatch(markNotification(notificationId));
  } catch (error) {
    console.log(error.message);
  }
};
