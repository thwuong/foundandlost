import axiosClient from "./axiosClient";
import { login } from "../stores/AuthSlice";
export const signin = async (user, dispatch, navigate) => {
  try {
    const data = await axiosClient.post("/auth/login", user);
    dispatch(login(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
