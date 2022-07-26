import { makeAutoObservable } from "mobx";
import oauthServices from "./services";
import { OAuthInfo } from "./types";

export default class OAuthStore {
  oauthConnencted: OAuthInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadOAuthInfo() {
    const res = await oauthServices.getOAuthInfo();
    this.oauthConnencted = res.data || [];
  }
}
