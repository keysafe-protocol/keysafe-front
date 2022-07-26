import React, { useEffect, useState } from "react";
import { useSetState } from "ahooks";

import useStore, { StepType, Transfer } from "./useStore";
import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/imgs/check.svg";
import styles from "./index.module.less";
import { ChainType } from "constants/enum";
import useQueryParams from "hooks/use-query-params";
import { CHAIN_TYPE_MAP } from "constants/index";
import VerifyEmail from "./VerifyEmail";

const TransferForm = () => {
  const {
    reset,
    setStep,
    setTransfer,
    setAccountChain,
    accountStore,
    transfer,
  } = useStore();
  const [verified, setVerified] = useState(true);
  const [query] = useQueryParams<{ account: string; from: string }>();
  const [visible, setVisible] = useState(false);

  const [fields, setFields] = useSetState<Transfer>(transfer);
  const [addrs, setAddrs] = useState<string[]>([]);
  const [valid, setValid] = useSetState<Record<string, boolean>>({
    account: false,
    from: false,
    to: false,
    amount: false,
  });

  useEffect(() => {
    const [account, from, to, amount] = [
      Boolean(fields.account),
      Boolean(fields.from),
      Boolean(fields.to),
      !isNaN(fields.amount) && Number(fields.amount) > 0,
    ];
    setValid({ account, from, to, amount });
    setVerified(account && from && to && amount);
  }, [setValid, fields]);

  useEffect(() => {
    if (accountStore) {
      const first = accountStore.accountChains[0];
      const addrs = accountStore.accountChains.map((chain) => chain.chain_addr);
      // Use url query default value
      setFields({
        ...fields,
        account: query.account || first.chain,
        from: query.from || first.chain_addr,
      });
      setAddrs(addrs);
    }
  }, [accountStore]);

  const handleTransfer = () => {
    const current = accountStore!.accountChains.find(
      (c) => c.chain_addr === fields.from
    );
    if (current) {
      setAccountChain({ ...current });
      setTransfer({ ...fields, amount: Number(fields.amount) });
      // setStep(StepType.AUTH);

      // 暂时只需要验证 email，成功则跳转到 success 页面
      setVisible(true);
    }
  };

  return (
    <main className={styles.authContainer}>
      {visible && (
        <VerifyEmail
          onOk={() => setStep(StepType.SUCCESS)}
          onCancel={() => setVisible(false)}
        />
      )}
      <div className="max-w-xl mx-auto grid grid-cols-1 gap-6">
        <h2 className="mb-2 text-2xl font-bold text-titlecolor">
          Make a Transfer
        </h2>
        <section>
          <p className="text-gray-700 mb-1">Select Account:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.account}
              onChange={(e) =>
                setFields({ account: e.target.value as ChainType })
              }
            >
              {Object.values(ChainType).map((type) => (
                <option key={type} value={type}>
                  {CHAIN_TYPE_MAP[type]}
                </option>
              ))}
            </select>
            <span className="ml-4 w-4"></span>
          </div>
        </section>
        <section>
          <p className="text-gray-700 mb-1">From Address:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.from}
              onChange={(e) => setFields({ from: e.target.value })}
            >
              {addrs.map((addr, index) => (
                <option key={index} value={addr}>
                  {addr}
                </option>
              ))}
            </select>
            <span className="ml-4 w-4"></span>
          </div>
        </section>
        <section>
          <p className="text-gray-700 mb-1">To Address:</p>
          <div className="flex items-center">
            <Input
              className="flex-1"
              value={fields.to}
              onChange={(e) => setFields({ to: e.target.value })}
            />
            <span className="ml-4 w-4">
              {valid.to && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
        </section>
        <section>
          <p className="text-gray-700 mb-1">Transfer Amount:</p>
          <div className="flex items-center">
            <Input
              className="flex-1"
              value={fields.amount}
              onChange={(e) => setFields({ amount: e.target.value })}
            />
            <span className="ml-4 w-4">
              {valid.amount && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
        </section>
      </div>
      <footer className="mt-10 flex justify-center">
        <Button
          type="primary"
          className="mr-4 px-10"
          disable={!verified}
          onClick={handleTransfer}
        >
          CONFIRM
        </Button>
        <Button className="px-10" onClick={() => reset()}>
          CANCEL
        </Button>
      </footer>
    </main>
  );
};

export default TransferForm;
