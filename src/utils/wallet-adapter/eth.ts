import { isEmpty } from "lodash-es";
import { Transfer } from "pages/transfer/useStore";
import BigNumber from "bignumber.js";
import { Wallet, utils, providers, ethers } from "ethers";
import { mnemonicValidate } from "@polkadot/util-crypto";
import { ChainType } from "constants/enum";
const ETHER_RPC = process.env.REACT_APP_ETHER_RPC;
const provider = new providers.JsonRpcProvider(ETHER_RPC);
export const privateKeyToAddress = (privateKey: string) => {
  const account = new Wallet(privateKey);
  return account ? account.address : "";
};

export const checkKey = (key: string, type: string) => {
  console.log(type !== ChainType.Polkadot);
  try {
    if (type !== ChainType.Polkadot) {
      const account = privateKeyToAddress(key);
      return !isEmpty(account);
    } else {
      return mnemonicValidate(key);
    }
  } catch {
    return false;
  }
};

export const getBalance = async (account: string, chain?: string) => {
  const balance = await provider.getBalance(account);
  return ethers.utils.formatEther(balance);
};
export const sendEth = async (privateKey: string, tx: Transfer) => {
  const wallet = new Wallet(privateKey).connect(provider);
  console.log(tx);
  const _tx = await wallet.sendTransaction({
    to: tx.to,
    value: utils.parseEther(tx.amount.toString()),
    gasLimit: 21000,
    gasPrice: utils.parseUnits("5", "gwei"),
  });
  return _tx.hash;
};
