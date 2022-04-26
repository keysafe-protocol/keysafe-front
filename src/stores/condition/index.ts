import { makeAutoObservable } from "mobx";
import { Condition } from "./type";

export default class ConditionStore {
  conditions: Condition[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateConditions(conditions: Condition[]) {
    this.conditions = conditions;
  }
}
