import Button from "components/button";
import React from "react";
import useStore, { StepType } from "./useStore";
import styles from "./index.module.less";

const SendTX = () => {
  const { shards, transfer, reset } = useStore();

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
        <Button className="px-10" onClick={() => reset()}>
          Home
        </Button>
      </footer>
    </main>
  );
};

export default SendTX;
