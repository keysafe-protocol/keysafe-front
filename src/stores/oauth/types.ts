import { OAuthOrg } from "constants/enum";

export type OAuthRequest = {
  // account: string;
  code: string;
  org?: OAuthOrg;
};

export type OAuthInfo = {
  kid: string;
  org: OAuthOrg;
  tee_profile: string;
  tee_profile_size: number;
};
