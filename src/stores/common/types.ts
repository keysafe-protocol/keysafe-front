import { PostMesaageType } from "constants/enum";

export type PostMesaageData<T = any> = {
  type: PostMesaageType;
  data?: T;
};
