import { ConditionType } from "constants/enum";
import request from "utils/request";

type UnSealType = {
  account: string;
  owner: string;
  chain: string;
  chain_addr: string;
  cond_type: ConditionType;
  cipher_cond_value: string;
};
const RecoverServices = {
  getAuthByAccount(data: { account: string }) {
    return request.post("/web3/cond", data);
  },

  getMailByAccount(data: { account: String }) {
    return request.post("/info_mail", data);
  },

  unseal(data: UnSealType) {
    return request.post("/unseal", data);
  },

  registerMailAuth(data: {
    account: string;
    mail: string;
    cipher_mail: string;
  }) {
    return request.post(`/register_mail_auth`, data);
  },
};

export default RecoverServices;
