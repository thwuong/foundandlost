import axiosClient from "./axiosClient";
import {} from "../stores/UserSlice";
import { addAccount } from "../stores/AccountSlice";
import showToast from "../utils/showToast";

export const getMyProfile = async (dispatch) => {
  try {
    const data = await axiosClient.get("/api/profile");
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
export const updateProfile = async (payload, dispatch) => {
  try {
    const data = await axiosClient.put("/api/profile/", payload);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getUser = async (userId, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/${userId}`);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
export const createUser = async (payload, dispatch) => {
  try {
    const data = await axiosClient.post(`/api/user/`, payload);
    dispatch(addAccount(data));
    showToast("success", data.message);
  } catch (error) {
    console.log(error);
    showToast("error", error.message);
  }
};
export const deleteUser = async (userId, dispatch) => {
  try {
    const data = await axiosClient.delete(`/api/user/${userId}`);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getAllUser = async (params, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/`);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
