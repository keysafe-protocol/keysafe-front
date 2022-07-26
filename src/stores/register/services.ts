import { OAuthRequest } from "stores/oauth/types";
import request from "utils/request";
import {
  DelegateRequest,
  DeleteSealRequest,
  RegisterGAuthRequest,
  RegisterMailAuthRequest,
  RegisterMailRequest,
  RegisterPassphraseRequest,
  SealRequest,
} from "./types";

const registerServices = {
  registerMailAuth(data: RegisterMailAuthRequest) {
    return request.post(`/register_mail_auth`, data);
  },

  registerMail(data: RegisterMailRequest) {
    return request.post(`/register_mail`, data);
  },

  registerPassphrase(data: RegisterPassphraseRequest) {
    return request.post(`/register_password`, data);
  },

  registerGAuth(data: RegisterGAuthRequest): Promise<{ gauth: string }> {
    return request.post(`/register_gauth`, data);
  },

  delegate(data: DelegateRequest) {
    return request.post(`/delegate`, data);
  },

  seal(data: SealRequest) {
    return request.post(`/seal`, data);
  },

  deleteSeal(data: DeleteSealRequest) {
    return request.post(`/delete_seal`, data);
  },

  registerOAuthGithub(data: OAuthRequest) {
    return request.post(`/register_oauth_github`, data);
  },
};

export default registerServices;
