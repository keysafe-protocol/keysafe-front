import { useEffect } from "react";
import { useState } from "react";
import { getBalance } from "utils/eth";

type Props = {
  address: string;
};
const useBalance = ({ address }: Props) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    getBalance(address).then(setBalance);
  }, []);

  return balance;
};
export default useBalance;
