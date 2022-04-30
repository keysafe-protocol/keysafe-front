import { LOCAL_STORAGE_KEY_ACCOUNT } from "constants/index";
import { makeAutoObservable } from "mobx";
import ls from "utils/ls";
import services from "./services";
import { AccountChain } from "./types";

export default class AccountStore {
  accountChains: AccountChain[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getUserInfo() {
    const email = ls.get(LOCAL_STORAGE_KEY_ACCOUNT);
    return {
      email: email,
    };
  }

  async loadUserInfo() {
    const res = await services.getUserInfo();
    this.accountChains = res.data || [];
  }
}
