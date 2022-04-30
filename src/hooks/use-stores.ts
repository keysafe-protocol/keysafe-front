import { createContext, useContext } from "react";
import AccountStore from "stores/account";
import ConditionStore from "stores/condition";
import RegisterStore from "stores/register";

const RootStoreContext = createContext({
  registerStore: new RegisterStore(),
  conditionStore: new ConditionStore(),
  accountStore: new AccountStore(),
});

const useStores = () => useContext(RootStoreContext);
export default useStores;
