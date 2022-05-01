import React from "react";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import LoginHome from "./pages/login-home";
import SignUp from "./pages/sign-up";
import Login from "./pages/login";
import Register from "./pages/register";
import RegisterKeys from "./pages/register-keys";
import DelegateSetting from "pages/delegate-setting";
import SetConditions from "pages/set-conditions";
import RegisterConfirm from "pages/register-confirm";
import RegisterSuccess from "pages/register-success";
import RecoverKeys from "./pages/recover-keys";
import Transfer from "./pages/transfer";
import { useRequest } from "ahooks";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import Home from "pages/home";
import Loading from "components/loading";
// import { privateKeyToAddress } from "utils/eth";
// import privateKeyToAddress from "ethereum-private-key-to-address";
// console.log(
//   window.privateKeyToAddress(
//     "4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
//   )
// );
// const web3 = new window.Web3("https://godwoken-testnet-web3-v1-rpc.ckbapp.dev");
const web3 = new window.Web3();
console.log(
  web3.eth.accounts.wallet.add(
    "919b425b860356fc5ba645807e4773c91f4f4b13857b8e6d42dcae54d2c6ed33"
  ),
  web3.eth.accounts.privateKeyToAccount(
    "919b425b860356fc5ba645807e4773c91f4f4b13857b8e6d42dcae54d2c6ed33"
  )
);
// const account = web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);

const App = observer(() => {
  const { accountStore } = useStores();
  const { loading } = useRequest(async () => {
    return accountStore.loadUserInfo();
  });

  if (loading) return <Loading />;
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route path={ROUTES.LOGIN_HOME} element={<LoginHome />}></Route>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />}></Route>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
          <Route path={ROUTES.REGISTER} element={<Register />}></Route>
          <Route path={ROUTES.REGISTER_KEYS} element={<RegisterKeys />}></Route>
          <Route
            path={ROUTES.DELEGATE_SETTINGS}
            element={<DelegateSetting />}
          ></Route>
          <Route
            path={ROUTES.SET_CONDITIONS}
            element={<SetConditions />}
          ></Route>
          <Route
            path={ROUTES.REGISTER_CONFIRM}
            element={<RegisterConfirm />}
          ></Route>
          <Route
            path={ROUTES.REGISTER_SUCCESS}
            element={<RegisterSuccess />}
          ></Route>
          <Route path={ROUTES.RECOVER_KEYS} element={<RecoverKeys />}></Route>
          <Route path={ROUTES.TRANSFER} element={<Transfer />}></Route>
        </Routes>
      </main>
    </div>
  );
});
export default App;
