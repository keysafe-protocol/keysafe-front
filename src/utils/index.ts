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

// cut secret into 3 pieces
export const keyShares = (key: string) => {
  const secretKeyHex = window.secrets.str2hex(key);
  const shares = window.secrets.share(secretKeyHex, 3, 2);
  return shares;
};

export const gauthKey = (email: string, secret: string) => {
  return `otpauth://totp/Keysafe:${email}?secret=${secret.slice(
    0,
    26
  )}&issuer=Keysafe.network`;
};
