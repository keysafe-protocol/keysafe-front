import React, { useEffect, useState } from "react";
import { useSetState } from "ahooks";

import useStore, { StepType, Transfer } from "./useStore";
import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/check.svg";
import styles from "./index.module.less";

const TransferForm = () => {
  const { reset, setStep, setTransfer, transfer } = useStore();
  const [verified, setVerified] = useState(true);

  const [fields, setFields] = useSetState<Transfer>(transfer);
  const [valid, setValid] = useSetState<Record<string, boolean>>({
    account: false,
    from: false,
    to: false,
    amount: false,
  });

  useEffect(() => {
    console.log(fields);
    const [account, from, to, amount] = [
      Boolean(fields.account),
      Boolean(fields.from),
      Boolean(fields.to),
      fields.amount > 0,
    ];
    setValid({ account, from, to, amount });
    setVerified(account && from && to && amount);
  }, [setValid, fields]);

  const handleTransfer = () => {
    setStep(StepType.AUTH);
    setTransfer(fields);
  };

  return (
    <main className={styles.authContainer}>
      <div className="max-w-xl mx-auto grid grid-cols-1 gap-6">
        <h2 className="mb-2 text-2xl font-bold text-titleblue">
          Make a Transfer
        </h2>
        <section>
          <p className="text-gray-700 mb-1">Select Account:</p>
          <div className="flex items-center">
            <select
              className="block flex-1"
              value={fields.account}
              onChange={(e) => setFields({ account: e.target.value })}
            >
              <option value="ethereum">ethereum</option>
              <option value="btc">btc</option>
            </select>
            <span className="ml-4 w-4">
              {/* {valid.account && <IconCheck className="w-4 h-4" />} */}
            </span>
          </div>
        </section>
        <section>
          <p className="text-gray-700 mb-1">From Address:</p>
          <div className="flex items-center">
            <Input
              type="text"
              className="flex-1"
              value={fields.from}
              onChange={(e) => setFields({ from: e.target.value })}
            />
            <span className="ml-4 w-4">
              {valid.from && <IconCheck className="w-4 h-4" />}
            </span>
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
              type="number"
              className="flex-1"
              value={fields.amount}
              onChange={(e) => setFields({ amount: Number(e.target.value) })}
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
