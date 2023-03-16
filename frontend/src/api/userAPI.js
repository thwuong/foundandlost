import axiosClient from "./axiosClient";
import { saveProfile, changeProfile } from "../stores/UserSlice";
import { updateUser } from "../stores/AuthSlice";
import showToast from "../utils/showToast";

export const getMyProfile = async (dispatch) => {
  try {
    const data = await axiosClient.get("/api/user/profile");
    dispatch(saveProfile(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const updateProfile = async (payload, dispatch) => {
  try {
    const data = await axiosClient.put("/api/user/profile", payload);
    dispatch(changeProfile(data));
    dispatch(updateUser(data));
    showToast("success", data.message);
  } catch (error) {
    console.log(error);
    showToast("error", error.message);
  }
};
export const getUser = async (userId, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/user/${userId}`);
    dispatch(saveProfile(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
