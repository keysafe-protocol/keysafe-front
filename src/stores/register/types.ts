import { ChainType, ConditionType } from "constants/enum";

export type PrivateKey = {
  type: ChainType;
  key: string;
};

export type RegisterContextModel = {
  privateKeys: PrivateKey[];
  updatePrivateKeys: (privateKeys: PrivateKey[]) => void;
};

export type Condition = {
  type?: ConditionType;
  value: string;
  code?: string; // email code or mobile code
  repeatPassPhrase?: string;
};

export type RegisterMailAuthRequest = {
  account: string;
  mail: string;
  cipher_mail: string;
};

export type RegisterMailRequest = {
  cipher_code: string;
} & RegisterMailAuthRequest;

export type RegisterPassphraseRequest = {
  account: string;
  cipher_code: string;
};

export type RegisterGAuthRequest = {
  account: string;
};

export type DelegateRequest = {
  account: string;
  to: string;
};

export type SealRequest = {
  account: string;
  chain: ChainType;
  chain_addr: string;
  cond_type: ConditionType;
  cipher_secret: string;
};

export type DelegateInfo = {
  delegate: boolean;
  to: string;
};

export type DeleteSealRequest = {
  account: string;
  chain: ChainType;
  chain_addr: string;
};
