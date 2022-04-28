import number from "./number";

// 倒计时格式化，毫秒 -> 秒
export const formatCountDown = (time: number) => {
  return Math.round(number.divide(time, 1000));
};
