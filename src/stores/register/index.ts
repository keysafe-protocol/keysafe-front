import { makeAutoObservable } from "mobx";
import { Condition, DelegateInfo, PrivateKey } from "./types";

export default class RegisterStore {
  privateKeys: PrivateKey[] = [];
  conditions: Condition[] = [];
  delegateInfo: DelegateInfo = {
    delegate: false,
    to: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  updatePrivateKeys(keys: PrivateKey[]) {
    this.privateKeys = keys;
  }

  updateConditions(conditions: Condition[]) {
    this.conditions = conditions;
  }

  updateDelegateInfo(delegateInfo: DelegateInfo) {
    this.delegateInfo = delegateInfo;
  }

  // After register done, clear all register info locally.
  clearRegisterInfo() {
    this.privateKeys = [];
    this.conditions = [];
    this.delegateInfo = { delegate: false, to: "" };
  }
}
