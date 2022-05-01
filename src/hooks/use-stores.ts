import { createContext, useContext } from "react";
import AccountStore from "stores/account";
import RegisterStore from "stores/register";

const RootStoreContext = createContext({
  registerStore: new RegisterStore(),
  accountStore: new AccountStore(),
});

const useStores = () => useContext(RootStoreContext);
export default useStores;
