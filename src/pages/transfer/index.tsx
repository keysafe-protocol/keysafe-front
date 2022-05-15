import React, { useEffect } from "react";
import useStore, { StepType } from "./useStore";

import Introduction from "./Introduction";
import Auth from "./Auth";
import Shard from "./Shard";
import SendTX from "./SendTX";
import Success from "./Success";
import TransferForm from "./TransferForm";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import useQueryParams from "hooks/use-query-params";

const Transfer = () => {
  const { accountStore } = useStores();
  const { step, setAccountStore, setUserInfo, setStep } = useStore();
  const [query] = useQueryParams<{ step: StepType }>();

  // If from 'make transfer', use default info from url query
  useEffect(() => {
    const step = query.step;
    if (step) {
      setStep(step);
    }
  }, []);

  useEffect(() => {
    if (step === StepType.INTRODUCTION) {
      setAccountStore(accountStore);
      setUserInfo(accountStore.userInfo);
    }
  }, [accountStore, setAccountStore, setUserInfo, step]);

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

export default observer(Transfer);
