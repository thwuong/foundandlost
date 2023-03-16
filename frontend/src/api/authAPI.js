import axiosClient from "./axiosClient";
import showToast from "../utils/showToast";
import { saveUser, clearUser } from "../stores/AuthSlice";
export const login = async (user, dispatch) => {
  try {
    const data = await axiosClient.post("/api/auth/login", user);
    dispatch(saveUser(data));
    showToast("success", data.message);
    return data;
  } catch (error) {
    showToast("error", error.message);
  }
};
export const logout = async (dispatch) => {
  try {
    const data = await axiosClient.post("/api/auth/logout");
    dispatch(clearUser());
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
