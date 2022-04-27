import create from "zustand";

export enum AuthType {
  EMAIL,
  PASS,
  GOOGLE,
}

export enum StepType {
  INTRODUCTION,
  AUTH,
  SHARD,
}

type Auth = {
  type: AuthType;
  shard?: string;
  success?: boolean;
} & Record<string, any>;

interface AuthState {
  shards: string[];
  auths: Auth[];
  step: StepType;
  activeAuth: AuthType | null;
}

const initialState: AuthState = {
  shards: [],
  auths: [
    { type: AuthType.EMAIL },
    { type: AuthType.PASS },
    { type: AuthType.GOOGLE },
  ],
  step: StepType.INTRODUCTION,
  activeAuth: null,
};

const useStore = create<
  AuthState & {
    reset: () => void;
    setStep: (step: StepType) => void;
    setActiveAuth: (type: AuthType | null) => void;
    setAuth: (auth: Auth) => void;
    getAuth: (type: AuthType) => Auth;
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
}));

export default useStore;
