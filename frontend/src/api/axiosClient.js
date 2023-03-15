import axios from "axios";
import jwtDecode from "jwt-decode";
import { updateToken } from "../stores/AuthSlice";
import { store } from "../stores/index";
import { useDispatch } from "react-redux";
const axiosClient = axios.create({
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
  const token = store.getState().auth.token;
  let date = new Date();

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp < date.getTime() / 1000) {
      try {
        const data = await axiosClient.post("/auth/refesh");
        if (data) {
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
    throw error.response.data;
  }
);

export default axiosClient;
