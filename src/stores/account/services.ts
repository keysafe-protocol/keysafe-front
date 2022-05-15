import request from "utils/request";
import { AuthConfirmRequest } from "./types";

export default {
  // Send code to email
  auth(data: { account: string }) {
    return request.post(`/auth`, {
      ...data,
      key: "",
    });
  },

  // Bind account with email code
  authConfirm(data: AuthConfirmRequest): Promise<{ token: string }> {
    return request.post(`/auth_confirm`, data);
  },

  getUserInfo() {
    return request.post("/info");
  },
};
