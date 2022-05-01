import { LOCAL_STORAGE_KEY_ACCOUNT } from "constants/index";
import { makeAutoObservable } from "mobx";
import ls from "utils/ls";
import services from "./services";
import { AccountChain, UserInfo } from "./types";

export default class AccountStore {
  accountChains: AccountChain[] = [];
  userInfo: UserInfo = {};

  constructor() {
    makeAutoObservable(this);
  }

  async loadUserInfo() {
    const res = await services.getUserInfo();
    this.accountChains = res.data || [];
    const email = ls.get(LOCAL_STORAGE_KEY_ACCOUNT);
    this.userInfo = {
      email: email,
    };
  }

  updateUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
}
