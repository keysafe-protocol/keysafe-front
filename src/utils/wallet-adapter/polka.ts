import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { encodeAddress, decodeAddress } from "@polkadot/keyring";
import { isHex, hexToU8a } from "@polkadot/util";
import { utils } from "ethers";

// Construct
let api: any = null;
async function polkaConnect() {
  try {
    if (!api) {
      const wsProvider = new WsProvider("wss://rpc.polkadot.io");
      api = await ApiPromise.create({ provider: wsProvider });
    }
  } catch (error) {
    console.log(error);
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
  return utils.formatUnits(Number(balance), 10);
}
export async function transferDot(
  seed: string,
  recipient: string,
  amount: string
) {
  const pair = createAccount(seed);
  const _amount = utils.parseUnits(amount, 10);
  const transfer = api.tx.balances.transfer(recipient, _amount.toNumber());
  const hash = await transfer.signAndSend(pair);
  return hash;
}

export const isPolkaAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};
