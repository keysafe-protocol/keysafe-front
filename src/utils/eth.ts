import { isEmpty } from "lodash-es";
import { Transfer } from "pages/transfer/useStore";
import BigNumber from "bignumber.js";
import { ethers, providers, Wallet, utils } from "ethers";

const web3 = new window.Web3("https://godwoken-testnet-web3-v1-rpc.ckbapp.dev");
const provider = new providers.JsonRpcBatchProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
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

export const getBalance = async (account: string) => {
  const balance = await provider.getBalance(account)
  return Number(ethers.utils.formatEther(balance))
};
export const sendEth = async (privateKey: string, tx:Transfer) => {
  const wallet = new Wallet(privateKey).connect(provider)
  console.log(tx)
  const _tx = await wallet.sendTransaction({
    to: tx.to,
    value: utils.parseEther(tx.amount.toString()),
    gasLimit: 21000,
    gasPrice: utils.parseUnits("5", "gwei")
  })
  return _tx.hash
}
