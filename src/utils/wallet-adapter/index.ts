import { ChainType } from "constants/enum";
import * as polka from "./polka";
import * as eth from "./eth";
import * as tron from "./tron";
export function privateKeyToAddress(key: string, type: ChainType) {
  switch (type) {
    case ChainType.Polkadot:
      return polka.createAccount(key).address;
    case ChainType.Tron:
      return tron.privateKeyToTronAddress(key);
    default:
      return eth.privateKeyToAddress(key);
  }
}
export const checkKey = (key: string, type: ChainType) => {
  return privateKeyToAddress(key, type);
};
export const getBalance = async (account: string, chain?: ChainType) => {
  const isPolka = polka.isPolkaAddress(account);
  const isTron = tron.isTron(account);
  if (!account) {
    return 0;
  }
  if (isTron) {
    return tron.getTronBalance(account);
  }
  if (isPolka) {
    return polka.getPolkaBalance(account);
  }
  return eth.getBalance(account);
};
