import React, { useEffect } from "react";
import Introduction from "./Introduction";
import AccountForm from "./AccountForm";
import Auth from "./Auth";
import Shard from "./Shard";
import useStore, { StepType } from "./useStore";
import Result from "./Result";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";

const Recover = () => {
  const { accountStore } = useStores();
  const { step, setAccountStore, setUserInfo } = useStore();

  useEffect(() => {
    if (step === StepType.INTRODUCTION) {
      setAccountStore(accountStore);
      setUserInfo(accountStore.userInfo);
    }
  }, [accountStore, setAccountStore, setUserInfo, step]);

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

export default observer(Recover);
