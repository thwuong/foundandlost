import axiosClient from "./axiosClient";
import { addAccount } from "../stores/AccountSlice";
import showToast from "../utils/showToast";

export const createAccount = async (payload, dispatch) => {
  try {
    const data = await axiosClient.post(`/api/user/`, payload);
    dispatch(addAccount(data));
    showToast("success", data.message);
  } catch (error) {
    console.log(error);
    showToast("error", error.message);
  }
};
export const deleteAccount = async (userId, dispatch) => {
  try {
    const data = await axiosClient.delete(`/api/user/${userId}`);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getAllAccount = async (params, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/`);
    // dispatch(saveProfile(data))
  } catch (error) {
    showToast("error", error.message);
  }
};
