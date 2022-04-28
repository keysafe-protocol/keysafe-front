import { createContext, useContext } from "react";
import ConditionStore from "stores/condition";
import RegisterStore from "stores/register";

const RootStoreContext = createContext({
  registerStore: new RegisterStore(),
  conditionStore: new ConditionStore(),
});

const useStores = () => useContext(RootStoreContext);
export default useStores;
