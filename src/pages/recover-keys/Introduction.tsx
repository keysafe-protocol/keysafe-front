import React from "react";
import Button from "components/button";
import useStore, { StepType } from "./useStore";

const Introduction = () => {
  const { setStep } = useStore();

  return (
    <main className="-mt-20 text-center w-1/2">
      <h2 className="text-6xl font-bold">Recover</h2>
      <p className=" mt-4 text-4xl text-zinc-400">
        Claim and retrieve your registered private keys from Keysafe’s
        decentralized custody network by fulfilling 2-of-3 Auth Conditions.
      </p>
      <footer className="mt-20">
        <Button type="primary" onClick={() => setStep(StepType.ACCOUNT)}>
          CONTINUE
        </Button>
      </footer>
    </main>
  );
};

export default Introduction;
