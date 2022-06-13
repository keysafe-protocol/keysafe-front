import axios, { AxiosResponse } from "axios";
import {
  LOCAL_STORAGE_KEY_ACCOUNT,
  LOCAL_STORAGE_TOKEN,
} from "constants/index";
import { ROUTES } from "constants/routes";
import ls from "./ls";
import message from "./message";

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? // ? "https://47.93.85.187:30000/ks"
        "https://demo.keysafe.network/ks" // hk 域名
      : "/ks",
  // baseURL: "https://bb2d4198-bc40-40c8-97c6-f18a802aee3a.mock.pstmn.io/",
});

request.interceptors.request.use((config) => {
  const { data = {}, headers } = config;
  const token = ls.get(LOCAL_STORAGE_TOKEN);
  return {
    ...config,
    headers: {
      ...headers,
      authorization: token,
    },
    data: {
      account: ls.get(LOCAL_STORAGE_KEY_ACCOUNT),
      ...data,
    },
  };
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    switch (data.status) {
      case "success":
        return data;
      case "fail":
        message({
          content: `Fail: ${response.config.url}`,
        });
        throw Error(data);
      default:
        return data;
    }
  },
  (error: any) => {
    if (error.response.status === 401) {
      window.location.href = `#${ROUTES.LOGIN_HOME}`;
    } else {
      message({
        content: error?.response?.data || error?.message,
      });
    }
    throw Error(error);
  }
);

export default request;
