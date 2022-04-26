export type Condition = {
  type: "email" | "passphrase" | "mobile";
  value: string;
};
