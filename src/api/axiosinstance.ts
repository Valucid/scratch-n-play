import axios, { AxiosResponse } from "axios";
import storage from "redux-persist/es/storage";
import { ApiUrl } from "../enums/url";

const getToken = (name: string) => sessionStorage.getItem(name);

let logOutTimer: any;

const axiosInstance = axios.create({
  baseURL: ApiUrl.BACKEND_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  },
  params: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken("token");

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error && error.response && error.response.status === 403) {
      window.localStorage.removeItem("token");

      if (logOutTimer) {
        clearInterval(logOutTimer);
      }

      logOutTimer = setTimeout(() => {
        window.location.href = "/";
        storage.removeItem("persist:root");
      }, 400);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
