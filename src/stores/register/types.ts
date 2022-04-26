export type PrivateKey = {
  type: "btc" | "eth";
  key: string;
};

export type RegisterContextModel = {
  privateKeys: PrivateKey[];
  updatePrivateKeys: (privateKeys: PrivateKey[]) => void;
};
