import { isEmpty } from "lodash-es";
import { Transfer } from "pages/transfer/useStore";
import BigNumber from "bignumber.js";

const web3 = new window.Web3("https://godwoken-testnet-web3-v1-rpc.ckbapp.dev");

export const privateKeyToAddress = (privateKey: string) => {
  const account = web3.eth.accounts.privateKeyToAccount(
    // "919b425b860356fc5ba645807e4773c91f4f4b13857b8e6d42dcae54d2c6ed33"
    privateKey
  );
  return account ? account.address : undefined;
};

export const checkEthKey = (key: string) => {
  try {
    const account = privateKeyToAddress(key);
    return !isEmpty(account);
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
  const txSign = await web3.eth.accounts.signTransaction(
    {
      to: tx.to,
      value: tx.amount,
      gas: 2000000,
    },
    privateKey
  );
  return txSign.rawTransaction;
};

export const getBalance = async (account: string) => {
  const balance = await web3.eth.getBalance(account);
  const num = new BigNumber(web3.utils.fromWei(balance));
  return num.toNumber().toFixed(6);
};
