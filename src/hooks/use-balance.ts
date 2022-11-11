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
    getBalance(address, chain).then((value) => {
      setBalance(Number(balance));
    });
  }, []);

  return balance;
};
export default useBalance;
