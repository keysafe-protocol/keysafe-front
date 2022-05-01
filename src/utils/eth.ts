import { isEmpty } from "lodash-es";

const web3 = new window.Web3();

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
