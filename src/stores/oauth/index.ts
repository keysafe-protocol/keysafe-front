import oauthServices from "./services";

export default class OAuthStore {
  oauthConnencted: string[] = [];

  async loadOAuthInfo() {
    const res = await oauthServices.getOAuthInfo();
    this.oauthConnencted = res.data || [];
  }
}
