import { useEffect } from "react";
import { useState } from "react";
import { getBalance } from "utils/eth";

type Props = {
  address: string;
};
const useBalance = ({ address }: Props) => {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    console.log(address)
    getBalance(address).then((value) => {
      setBalance(Number(value));
    });
  }, []);

  return balance;
};
export default useBalance;
