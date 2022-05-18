import Button from "components/button";
import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { isEmpty } from "lodash-es";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accounts from "./accounts";
import Sidebar from "./sidebar";

const Home = observer(() => {
  const {
    accountStore: { userInfo, accountChains },
  } = useStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.email) {
      navigate(ROUTES.LOGIN_HOME);
    } else if (isEmpty(accountChains)) {
      navigate(ROUTES.REGISTER);
    }
  }, []);

  return (
    <section className="flex justify-center ks-full-container bg-neutral-100">
      <main className="flex lg:max-w-6xl xl:max-w-7xl">
        <Sidebar />
        <Accounts />
      </main>
    </section>
  );
});
export default Home;
