import Button from "components/button";
import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { isEmpty } from "lodash-es";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="flex flex-col items-center ks-full-container justify-center">
      <h2 className="font-bold text-6xl ">HOME</h2>
      <p className="mt-4 text-4xl text-center w-3/5 text-zinc-400">
        Your account has been safely stored by Keysafe, you can choose to
        restore your account or initiate a transfer at any time.
      </p>
      {!isEmpty(accountChains) && (
        <footer className="flex items-center justify-center mt-20">
          <Button type="primary" onClick={() => navigate(ROUTES.RECOVER_KEYS)}>
            Recover
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.TRANSFER)}
            className="ml-32"
          >
            Transfer
          </Button>
        </footer>
      )}
    </section>
  );
});
export default Home;
