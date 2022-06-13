import oauthServices from "./services";
import { OAuthInfo } from "./types";

export default class OAuthStore {
  oauthConnencted: OAuthInfo[] = [];

  async loadOAuthInfo() {
    const res = await oauthServices.getOAuthInfo();
    this.oauthConnencted = res.data || [];
  }
}
