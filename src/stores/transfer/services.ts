import request from "utils/request";

const TransferService = {
  sign(data: any) {
    return request.post("/sign", data);
  },
};

export default TransferService;
