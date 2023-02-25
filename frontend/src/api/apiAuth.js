import axiosClient from "./axiosClient";
import { loginStart, loginSuccess, loginFailure } from "../stores/AuthSlice";
export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const data = await axiosClient.post("/auth/login", user);
    // window.localStorage.setItem("token", data.accessToken);
    dispatch(loginSuccess(data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailure());
  }
};
