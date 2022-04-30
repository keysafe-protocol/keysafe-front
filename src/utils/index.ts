import number from "./number";

// 倒计时格式化，毫秒 -> 秒
export const formatCountDown = (time: number) => {
  return Math.round(number.divide(time, 1000));
};

export const checkEmail = (email: string) => {
  const regexp = new RegExp(
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  return regexp.test(email);
};
