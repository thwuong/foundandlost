import axios from "axios";
import jwtDecode from "jwt-decode";
import { updateToken } from "../stores/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (
    config.url.indexOf("/auth/login") >= 0 ||
    config.url.indexOf("/auth/refesh")
  ) {
    return config;
  }
  const token = useSelector((state) => state.auth.token);
  // const token = window.localStorage.getItem("token");
  let date = new Date();

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.iat < date.getTime() / 1000) {
      try {
        const data = await axiosClient.post("/auth/refesh");
        if (data) {
          // window.localStorage.setItem("token", data.accessToken);
          const dispatch = useDispatch();
          dispatch(updateToken(data));
          config.headers.Authorization = `Bearer ${data.accessToken}`;
        }
      } catch (error) {
        console.log(error);
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
