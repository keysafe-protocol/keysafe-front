import { ConditionType } from "constants/enum";
import request from "utils/request";

type UnSealType = {
  account: string;
  chain: string;
  chain_addr: string;
  condition_type: ConditionType;
  cipher_condition_value: string;
};
const RecoverServices = {
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
