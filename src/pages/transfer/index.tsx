import React from "react";
import useStore from "./useStore";

import Introduction from "./Introduction";
import Auth from "./Auth";
import Shard from "./Shard";
import SendTX from "./SendTX";
import Success from "./Success";
import TransferForm from "./TransferForm";

const Transfer = () => {
  const { step } = useStore();
  const STEPS = [
    <Introduction />,
    <TransferForm />,
    <Auth />,
    <Shard />,
    <SendTX />,
    <Success />,
  ];
  return (
    <div className="flex justify-center items-center ks-full-container">
      {STEPS[step]}
    </div>
  );
};

export default Transfer;
