import React from "react";
import Introduction from "./Introduction";
import Auth from "./Auth";
import Shard from "./Shard";
import useStore from "./useStore";

const Recover = () => {
  const { step } = useStore();
  const STEPS = [<Introduction />, <Auth />, <Shard />];
  return (
    <div className="flex justify-center items-center ks-full-container">
      {STEPS[step]}
    </div>
  );
};

export default Recover;
