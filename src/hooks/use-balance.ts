import { useEffect } from "react";
import { useState } from "react";
import { getBalance } from "utils/eth";

type Props = {
  address: string;
};
const useBalance = ({ address }: Props) => {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    getBalance(address).then((value) => {
      setBalance(Number(balance));
    });
  }, []);

  return balance;
};
export default useBalance;
