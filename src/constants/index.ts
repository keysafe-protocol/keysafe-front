import { ChainType, OAuthType } from "./enum";

export const LOCAL_STORAGE_KEY_ACCOUNT = "keysafe_account";
export const LOCAL_STORAGE_TOKEN = "keysafe_token";
export const CHAIN_TYPE_MAP = {
  [ChainType.Eth]: "Ethereum",
  [ChainType.Boba]: "Boba Rinkeby",
};
export const GITHUB_CLIENT_ID = "fd2d170df56ebacde768";
export const OAUTH_TYPE_MAP = {
  [OAuthType.Github]: "Github",
  [OAuthType.Google]: "Google",
  [OAuthType.Twitter]: "Twitter",
};
