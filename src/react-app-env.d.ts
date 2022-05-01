/// <reference types="react-scripts" />
declare module "*.module.less" {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
  declare module "*.less";
}

declare module "secrets.js" {}

declare interface Window {
  secrets: {
    str2hex(str: string, bytesPerChar?: unknown): string;
    share(secret?, numShares?, threshold?, padLength?): string[];
    combine(shares: string[], at?: number): string;
    hex2str(str: string, bytesPerChar?: number): string;
  };
  Web3: any;

  privateKeyToAddress(str: string): string;
}
