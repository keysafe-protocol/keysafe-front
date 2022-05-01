const privateKeyToPublicKey = require("ethereum-private-key-to-public-key");
const publicKeyToAddress = require("ethereum-public-key-to-address");
const Buffer = require("safe-buffer").Buffer;
console.log(Buffer);

export function privateKeyToAddress(privateKey: string) {
  if (!Buffer.isBuffer(privateKey)) {
    if (typeof privateKey !== "string") {
      throw new Error("Expected Buffer or string as argument");
    }

    privateKey =
      privateKey.slice(0, 2) === "0x" ? privateKey.slice(2) : privateKey;
    privateKey = Buffer.from(privateKey, "hex") as any;
  }

  return publicKeyToAddress(privateKeyToPublicKey(privateKey));
}
