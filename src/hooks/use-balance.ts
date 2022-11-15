import { useEffect } from "react";
import { useState } from "react";
import { getBalance } from "utils/eth";

type Props = {
  address: string;
  chain: string;
};
const useBalance = ({ address, chain }: Props) => {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    console.log(address, chain);

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
