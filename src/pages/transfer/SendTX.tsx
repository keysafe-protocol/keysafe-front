import Button from "components/button";
import React from "react";
import useStore, { StepType } from "./useStore";
import styles from "./index.module.less";

const SendTX = () => {
  const { shards, transfer, setStep, reset } = useStore();

  const handleSend = () => {
    // TODO

    setStep(StepType.SUCCESS);
  };
  return (
    <main className={styles.authContainer}>
      <section className="grid space-y-5">
        <h3 className="text-2xl font-medium">Transaction Content:</h3>
        <div className="w-full h-60 bg-gray-200">
          <pre>shards: {JSON.stringify(shards)}</pre>
          <pre>transfer: {JSON.stringify(transfer)}</pre>
        </div>
        <p className="text-orange-300">
          Please confirm the transaction content before sending. You are still
          able to cancel the transaction in this step.
        </p>
      </section>
      <footer className="mt-10 flex justify-center">
        <Button type="primary" className="mr-4 px-10" onClick={handleSend}>
          CONFIRM AND SEND TX
        </Button>
        <Button className="px-10" onClick={() => reset()}>
          CANCEL
        </Button>
      </footer>
    </main>
  );
};

export default SendTX;
