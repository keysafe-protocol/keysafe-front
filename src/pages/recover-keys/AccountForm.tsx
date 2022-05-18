import React, { useEffect, useState } from "react";
import { useSetState } from "ahooks";
import useStore, { StepType } from "./useStore";
import Button from "components/button";
import styles from "./index.module.less";
import { ChainType } from "constants/enum";
import { AccountChain } from "stores/account/types";
import useQueryParams from "hooks/use-query-params";
import { CHAIN_TYPE_MAP } from "constants/index";

const AccountForm = () => {
  const {
    reset,
    setStep,
    accountChain,
    setAccountChain,
    accountStore,
  } = useStore();
  const [fields, setFields] = useSetState<AccountChain>(accountChain);
  const [addrs, setAddrs] = useState<string[]>([]);
  const [query] = useQueryParams<{ chain: ChainType; chain_addr: string }>();

  useEffect(() => {
    if (accountStore) {
      const addrs = accountStore.accountChains.map((chain) => chain.chain_addr);
      setAddrs(addrs);
      setFields({
        ...accountChain,
        chain: query.chain || ChainType.Eth,
        chain_addr: query.chain_addr || addrs[0],
      });
    }
  }, [accountChain, accountStore, setFields]);

  const handleConfirm = () => {
    const current = accountStore!.accountChains.find(
      (c) => c.chain_addr === fields.chain_addr
    );
    if (current) {
      setAccountChain({ ...current });
      setStep(StepType.AUTH);
    }
  };

  return (
    <main className={styles.authContainer}>
      <div className="max-w-xl mx-auto grid grid-cols-1 gap-6">
        <h2 className="mb-2 text-2xl font-bold text-titlecolor">Recover Key</h2>
        <section>
          <p className="text-gray-700 mb-1">Select Network:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.chain}
              onChange={(e) =>
                setFields({ chain: e.target.value as ChainType })
              }
            >
              {Object.values(ChainType).map((type) => (
                <option key={type} value={type}>
                  {CHAIN_TYPE_MAP[type]}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section>
          <p className="text-gray-700 mb-1">Select Key:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.chain_addr}
              onChange={(e) => setFields({ chain_addr: e.target.value })}
            >
              {addrs.map((addr, index) => (
                <option key={index} value={addr}>
                  {addr}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>
      <footer className="mt-10 flex justify-center">
        <Button type="primary" className="mr-4 px-10" onClick={handleConfirm}>
          CONFIRM
        </Button>
        <Button className="px-10" onClick={() => reset()}>
          CANCEL
        </Button>
      </footer>
    </main>
  );
};

export default AccountForm;
