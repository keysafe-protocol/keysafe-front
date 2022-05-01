import { makeAutoObservable } from "mobx";
import { Condition, PrivateKey } from "./types";

export default class RegisterStore {
  privateKeys: PrivateKey[] = [];
  conditions: Condition[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updatePrivateKeys(keys: PrivateKey[]) {
    this.privateKeys = keys;
  }

  updateConditions(conditions: Condition[]) {
    this.conditions = conditions;
  }
}
