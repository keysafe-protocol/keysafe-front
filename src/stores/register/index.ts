import { makeAutoObservable } from "mobx";
import { PrivateKey } from "./types";

export default class RegisterStore {
  privateKeys: PrivateKey[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updatePrivateKeys(keys: PrivateKey[]) {
    this.privateKeys = keys;
  }
}
