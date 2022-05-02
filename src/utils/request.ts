import axios, { AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEY_ACCOUNT } from "constants/index";
import { ROUTES } from "constants/routes";
import ls from "./ls";
import message from "./message";

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://47.93.85.187:30000/"
      : "/",
  // baseURL: "https://bb2d4198-bc40-40c8-97c6-f18a802aee3a.mock.pstmn.io/",
});

request.interceptors.request.use((config) => {
  const { data = {} } = config;
  return {
    ...config,
    data: {
      account: ls.get(LOCAL_STORAGE_KEY_ACCOUNT),
      ...data,
    },
  };
});

const handleError = (url: string, content: string) => {
  if (url === "/info") {
    window.location.href = `#/${ROUTES.LOGIN_HOME}`;
  } else {
    message({
      content: content,
    });
  }
};
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    console.log(response.config.url);
    switch (data.status) {
      case "success":
        return data;
      case "fail":
        handleError(response.config.url!, `Fail: ${response.config.url}`);
        throw Error(data);
      default:
        return data;
    }
  },
  (error: any) => {
    handleError(error.config.url!, error?.response?.data || error?.message);
    throw Error(error);
  }
);

export default request;
