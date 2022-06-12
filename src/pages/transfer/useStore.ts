import { ChainType } from "constants/enum";
import AccountStore from "stores/account";
import { AccountChain, UserInfo } from "stores/account/types";
import create from "zustand";

export enum AuthType {
  EMAIL,
  PASS,
  GOOGLE,
  GithubAuth,
}

export enum StepType {
  INTRODUCTION,
  TRANSFERFORM,
  AUTH,
  SHARD,
  SENDTX,
  SUCCESS,
}

export type Transfer = {
  account: string;
  from: string;
  to: string;
  amount: number;
};

type Auth = {
  type: AuthType;
  shard?: string;
  success?: boolean;
} & Record<string, any>;

interface AuthState {
  userInfo: UserInfo;
  accountStore?: AccountStore;
  accountChain: AccountChain;
  shards: string[];
  auths: Auth[];
  step: StepType;
  activeAuth: AuthType | null;
  transfer: Transfer;
  signature: string;
}

const initialState: AuthState = {
  userInfo: {},
  accountChain: { chain: ChainType.Eth, chain_addr: "", owner: "" }, // current selected chain
  shards: [],
  auths: [
    { type: AuthType.EMAIL },
    { type: AuthType.PASS },
    { type: AuthType.GOOGLE },
    { type: AuthType.GithubAuth },
  ],
  step: StepType.INTRODUCTION,
  activeAuth: null,
  transfer: {
    account: "ethereum",
    from: "",
    to: "",
    amount: 0,
  },
  signature: "",
};

const useStore = create<
  AuthState & {
    reset: () => void;
    setStep: (step: StepType) => void;
    setActiveAuth: (type: AuthType | null) => void;
    setAuth: (auth: Auth) => void;
    getAuth: (type: AuthType) => Auth;
    setAccountChain: (accountChain: AccountChain) => void;
    setTransfer: (t: Transfer) => void;
    setAccountStore: (store: AccountStore) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    setSignature: (signature: string) => void;
  }
>((set, get) => ({
  ...initialState,
  reset: () => set({ ...initialState }),
  setStep: (step: StepType) => set({ step }),
  setActiveAuth: (activeAuth: AuthType | null) => set({ activeAuth }),
  setAuth: (auth: Auth) =>
    set((state) => {
      const auths = state.auths.map((n) => (n.type === auth.type ? auth : n));
      return {
        auths: auths,
        shards: auths.map((n) => n.shard || "").filter((n) => n),
      };
    }),
  getAuth: (type: AuthType) => {
    const auth = get().auths.find((auth) => auth.type === type);
    if (auth === undefined) {
      throw new TypeError();
    }
    return auth;
  },
  setTransfer: (transfer: Transfer) => {
    set({ transfer });
  },
  setAccountChain: (accountChain: AccountChain) => set({ accountChain }),
  setAccountStore: (accountStore: AccountStore) => set({ accountStore }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  setSignature: (signature: string) => set({ signature }),
}));

export default useStore;
