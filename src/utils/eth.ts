import { isEmpty } from "lodash-es";
import { Transfer } from "pages/transfer/useStore";
import BigNumber from "bignumber.js";
import { ethers, providers, Wallet, utils } from "ethers";
import { mnemonicValidate } from "@polkadot/util-crypto";
import { ChainType } from "constants/enum";
import { createAccount, getPolkaBalance } from "./polka";
import { privateKeyToTronAddress } from "./tron.js";
const web3 = new window.Web3("https://godwoken-testnet-web3-v1-rpc.ckbapp.dev");
const provider = new providers.JsonRpcBatchProvider(
  "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);

export const privateKeyToAddress = (privateKey: string, type?: string) => {
  if (type === ChainType.Polkadot) {
    const account = createAccount(privateKey).address;
    return account;
  } else if (type === ChainType.Tron) {
    return privateKeyToTronAddress(privateKey);
  } else {
    const account = web3.eth.accounts.privateKeyToAccount(
      // "919b425b860356fc5ba645807e4773c91f4f4b13857b8e6d42dcae54d2c6ed33"
      privateKey
    );
    return account ? account.address : undefined;
  }
};

export const checkKey = (key: string, type: string) => {
  console.log(type !== ChainType.Polkadot);
  try {
    if (type === ChainType.Polkadot) {
      return mnemonicValidate(key);
    } else if (type !== ChainType.Tron) {
      const account = privateKeyToTronAddress(key);
      return !isEmpty(account);
    } else {
      const account = privateKeyToAddress(key, type);
      return !isEmpty(account);
    }
  } catch {
    return false;
  }
};

// {
//   to: "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55",
//   value: "1000000000",
//   gas: 2000000,
// },
export const signTransaction = async (
  tx: Transfer,
  privateKey: string
): Promise<string> => {
  const txSign = await web3.eth.accounts.sendTransaction(
    {
      to: tx.to,
      value: tx.amount,
      gas: 2000000,
    },
    privateKey
  );
  return txSign.rawTransaction;
};

export const getBalance = async (account: string, chain?: string) => {
  const isPolka = chain === ChainType.Polkadot || !account.startsWith("0x");
  if (isPolka) {
    return await getPolkaBalance(account);
  }
  const balance = await web3.eth.getBalance(account);
  const num = new BigNumber(web3.utils.fromWei(balance));
  return num.toNumber().toFixed(6);
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
