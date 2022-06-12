export enum ChainType {
  Eth = "ethereum",
  Boba = "boba",
  // Btc = "btc",
}

export enum ConditionType {
  Email = "email",
  Passphrase = "password",
  GAuth = "gauth",
  OAuthGithub = "oauth@github",
}

export enum HomeMenus {
  KeyList = "key-list",
  Web2Accounts = "web2-accounts",
  AuthConditions = "auth-conditions",
  GeneralSettings = "general-settings",
  Logout = "logout",
}

export enum PostMesaageType {
  OAuthSuccess, // oauth 成功
  OAuthFail, // oauth 失败
}

export enum OAuthType {
  Github = "oauth@github",
  Google = "oauth@google",
  Twitter = "oauth@twitter",
}
