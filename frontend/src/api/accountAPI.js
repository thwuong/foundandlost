import axiosClient from "./axiosClient";
import { addAccount, removeAccount, saveAccounts, selectedAccount, saveAccount } from "../stores/AccountSlice";
import showToast from "../utils/showToast";

export const createAccount = async (payload, dispatch) => {
  try {
    const data = await axiosClient.post(`/api/user/`, payload);
    dispatch(addAccount(data));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
export const deleteAccount = async (userId, dispatch) => {
  try {
    const data = await axiosClient.delete(`/api/user/${userId}`);
    dispatch(removeAccount(userId));
    showToast("error", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getAllAccount = async (dispatch, params) => {
  try {
    const data = await axiosClient.get(`/api/user/`, params);
    dispatch(saveAccounts(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getAccount = async (userId, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/${userId}`);
    dispatch(selectedAccount(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const editAccount = async (values, userId, dispatch) => {
  try {
    const data = await axiosClient.put(`/api/user/${userId}`, values);
    dispatch(saveAccount(data));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
