import axiosClient from "./axiosClient";
import { saveUser, clearUser } from "../stores/AuthSlice";
export const login = async (user, dispatch) => {
  try {
    const data = await axiosClient.post("/auth/login", user);
    dispatch(saveUser(data));
    return data;
  } catch (error) {
    console.log(error.data.message);
  }
};
export const logout = async (dispatch) => {
  try {
    const data = await axiosClient.post("/auth/logout");
    dispatch(clearUser(data));
    return data;
  } catch (error) {
    console.log(error.data.message);
  }
};
