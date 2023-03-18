import axios from "axios";
import jwtDecode from "jwt-decode";
import { updateToken } from "../stores/AuthSlice";
import { store } from "../stores/index";
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (
    config.url.indexOf("/api/auth/login") >= 0 ||
    config.url.indexOf("/api/auth/logout") >= 0
  ) {
    return config;
  }
  const token = store.getState().auth.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    let date = new Date();
    if (decodedToken.exp < date.getTime() / 1000) {
      try {
        const { data } = await axios.post("/api/auth/refresh");
        store.dispatch(updateToken(data));
        config.headers.authorization = `Bearer ${data.accessToken}`;
      } catch (error) {
        alert("Hết phiên đăng nhập, Vui lòng đăng nhập lại!");
        if (error.response.status === 401 && error.response.text) {
          store.dispatch(updateToken({ accessToken: "" }));
        }
      }
    } else {
      config.headers.authorization = `Bearer ${token}`;
    }
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
