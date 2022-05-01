import request from "utils/request";
import {
  DelegateRequest,
  RegisterGAuthRequest,
  RegisterMailAuthRequest,
  RegisterMailRequest,
  RegisterPassphraseRequest,
  SealRequest,
} from "./types";

export default {
  registerMailAuth(data: RegisterMailAuthRequest) {
    return request.post(`/register_mail_auth`, data);
  },

  registerMail(data: RegisterMailRequest) {
    return request.post(`/register_mail`, data);
  },

  registerPassphrase(data: RegisterPassphraseRequest) {
    return request.post(`/register_password`, data);
  },

  registerGAuth(data: RegisterGAuthRequest) {
    return request.post(`/register_gauth`, data);
  },

  delegate(data: DelegateRequest) {
    return request.post(`/delegate`, data);
  },

  seal(data: SealRequest) {
    return request.post(`/seal`, data);
  },
};
