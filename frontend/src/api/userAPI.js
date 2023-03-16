import axiosClient from "./axiosClient";
import { saveProfile } from "../stores/UserSlice";
import showToast from "../utils/showToast";

export const getMyProfile = async (dispatch) => {
  try {
    const data = await axiosClient.get("/api/user/profile");
    dispatch(saveProfile(data));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
export const updateProfile = async (payload, dispatch) => {
  try {
    const data = await axiosClient.put("/api/user/profile", payload);
    // dispatch(saveProfile(data))
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getUser = async (userId, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/${userId}`);
    dispatch(saveProfile(data));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
