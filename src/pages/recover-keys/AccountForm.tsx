import React from "react";
import { useSetState } from "ahooks";

import useStore, { StepType, Account } from "./useStore";
import Button from "components/button";
import styles from "./index.module.less";
import { ChainType } from "constants/enum";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";

const AccountForm = () => {
  const {
    accountStore: { accountChains },
  } = useStores();

  const addrs = accountChains.map((account) => account.chain_addr);
  const { reset, setStep, account, setAccount } = useStore();
  const [fields, setFields] = useSetState<Account>({
    ...account,
    chianAddr: addrs[0],
  });

  const handleConfirm = () => {
    setAccount(fields);
    setStep(StepType.AUTH);
  };

  return (
    <main className={styles.authContainer}>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <div className="max-w-xl mx-auto grid grid-cols-1 gap-6">
        <h2 className="mb-2 text-2xl font-bold text-titlecolor">Recover Key</h2>
        <section>
          <p className="text-gray-700 mb-1">Select Network:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.chain}
              onChange={(e) => setFields({ chain: e.target.value })}
            >
              <option value={ChainType.Eth}>{ChainType.Eth}</option>
              <option value={ChainType.Btc}>{ChainType.Btc}</option>
            </select>
          </div>
        </section>

        <section>
          <p className="text-gray-700 mb-1">Select Key:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.chianAddr}
              onChange={(e) => setFields({ chianAddr: e.target.value })}
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

export default observer(AccountForm);
