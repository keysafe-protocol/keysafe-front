import React from "react";
import Button from "components/button";
import useStore, { StepType } from "./useStore";

const Introduction = () => {
  const { setStep } = useStore();

  return (
    <main className="-mt-20 text-center w-1/2">
      <h2 className="text-6xl font-bold">Remote Transfer</h2>
      <p className=" mt-4 text-4xl text-zinc-400">
        Thanks to Keysafe’s decentralized custody network and MPC (multi-party
        computation), you can remotely sign transactions in a wallet-less and
        key-less way.
      </p>
      <footer className="mt-20">
        <Button type="primary" onClick={() => setStep(StepType.TRANSFERFORM)}>
          CONTINUE
        </Button>
      </footer>
    </main>
  );
};

export default Introduction;
