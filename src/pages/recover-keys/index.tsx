import React from "react";
import Introduction from "./Introduction";
import AccountForm from "./AccountForm";
import Auth from "./Auth";
import Shard from "./Shard";
import useStore from "./useStore";
import Result from "./Result";

const Recover = () => {
  const { step } = useStore();
  const STEPS = [
    <Introduction />,
    <AccountForm />,
    <Auth />,
    <Shard />,
    <Result />,
  ];
  return (
    <div className="flex justify-center items-center ks-full-container">
      {STEPS[step]}
    </div>
  );
};

export default Recover;
