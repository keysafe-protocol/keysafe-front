import { ChainType } from "constants/enum";
import { useEffect } from "react";
import { useState } from "react";
import { getBalance } from "utils/wallet-adapter";

type Props = {
  address: string;
  chain: ChainType;
};
const useBalance = ({ address, chain }: Props) => {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    getBalance(address, chain)
      .then((value) => {
        setBalance(Number(value));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return balance;
};
export default useBalance;
