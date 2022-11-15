import Button from "components/button";
import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import useStore from "./useStore";

const Success = () => {
  const { reset, signature } = useStore();
  const navigate = useNavigate();

  return (
    <main className={styles.authContainer}>
      <div className="flex flex-col h-full">
        <h1 className="text-4xl font-bold text-authpass">Congratulations!</h1>
        <p className="text-3xl mt-1">
          You transaction has been sent. Click{" "}
          <a target={"__blank"} href={signature} className="underline">
            here
          </a>{" "}
          to check Tx status.
        </p>
        <footer className="flex justify-center mt-80">
          <Button
            className="px-10"
            onClick={() => {
              reset();
              navigate(ROUTES.HOME);
            }}
          >
            HOME
          </Button>
        </footer>
      </div>
    </main>
  );
};

export default Success;
