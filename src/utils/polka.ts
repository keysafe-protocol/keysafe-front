import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import web3 from "web3";

// Construct
let api: any = null;
async function polkaConnect() {
  if (!api) {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    api = await ApiPromise.create({ provider: wsProvider });
  }
}
polkaConnect();

export function createAccount(PHRASE: string) {
  const keyring = new Keyring({ type: "sr25519", ss58Format: 0 });
  const newPair = keyring.addFromUri(PHRASE);
  return newPair;
}

export async function getPolkaBalance(address: string) {
  await polkaConnect();
  const res = await api.query.system.account(address);
  const balance = JSON.parse(JSON.stringify(res)).data.free;
  return Number(balance);
}
export async function transferDot(
  seed: string,
  recipient: string,
  amount: number
) {
  const pair = createAccount(seed);
  const transfer = api.tx.balances.transfer(recipient, amount);
  const hash = await transfer.signAndSend(pair);
  return hash;
}
