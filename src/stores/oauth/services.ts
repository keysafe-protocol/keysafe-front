import request from "utils/request";
import { OAuthRequest } from "./types";

const oauthServices = {
  oauth(data: OAuthRequest): Promise<{ profile: string }> {
    return request.post(`/oauth`, data);
  },

  getOAuthInfo() {
    return request.post(`/info_oauth`);
  },
};

export default oauthServices;
