import TronWeb from "tronweb";
const TRON_PRO_API_KEY = process.env.REACT_APP_TRON_PRO_API_KEY;
const tronWeb = new TronWeb({
  // fullHost: "https://api.trongrid.io",
  fullHost: "https://nile.trongrid.io",
  headers: { "TRON-PRO-API-KEY": TRON_PRO_API_KEY },
});
export const privateKeyToTronAddress = (privateKey) => {
  return tronWeb.address.fromPrivateKey(privateKey);
};
export const sendTron = async (privateKey, to, amount) => {
  try {
    const from = privateKeyToTronAddress(privateKey);
    const _amount = tronWeb.toSun(amount);
    const txn = await tronWeb.transactionBuilder.sendTrx(to, _amount, from);
    const signedTxn = await tronWeb.trx.sign(txn, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    return receipt.txid;
  } catch (error) {
    console.log(error);
  }
};
export const getTronBalance = async (address) => {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return tronWeb.fromSun(balance);
  } catch (error) {
    return 0;
  }
};
export const isTron = (address) => {
  return tronWeb.isAddress(address);
};
