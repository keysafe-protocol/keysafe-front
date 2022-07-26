import { ChainType } from "constants/enum";
import AccountStore from "stores/account";
import { AccountChain, UserInfo } from "stores/account/types";
import create from "zustand";

export enum AuthType {
  EMAIL = "email",
  PASS = "password",
  GOOGLE = "gauth",
  GithubAuth = "oauth@github",
}

export enum StepType {
  INTRODUCTION,
  ACCOUNT,
  AUTH,
  SHARD,
  RESULT,
}

type Auth = {
  type: AuthType;
  shard?: string;
  success?: boolean;
  enable?: boolean;
} & Record<string, any>;

interface AuthState {
  userInfo: UserInfo;
  accountStore?: AccountStore;
  accountChain: AccountChain;
  shards: string[];
  auths: Auth[];
  step: StepType;
  activeAuth: AuthType | null;
  privateKey: string;
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
  privateKey: "",
};

const useStore = create<
  AuthState & {
    reset: () => void;
    setStep: (step: StepType) => void;
    setActiveAuth: (type: AuthType | null) => void;
    setAuth: (auth: Auth) => void;
    getAuth: (type: AuthType) => Auth;
    setAuths: (auths: Auth[]) => void;
    setAccountChain: (accountChain: AccountChain) => void;
    setAccountStore: (store: AccountStore) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    setPrivateKey: (privateKey: string) => void;
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
  setAuths: (auths: Auth[]) => set({ auths }),
  setAccountChain: (accountChain: AccountChain) => set({ accountChain }),
  setAccountStore: (accountStore: AccountStore) => set({ accountStore }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  setPrivateKey: (privateKey: string) => set({ privateKey }),
}));

export default useStore;
