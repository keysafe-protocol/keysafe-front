import request from "utils/request";

const RecoverService = {
  unseal(data: any) {
    return request.post("/unseal", data);
  },
};

export default RecoverService;
