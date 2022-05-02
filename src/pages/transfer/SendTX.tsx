import Button from "components/button";
import React from "react";
import useStore from "./useStore";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const SendTX = () => {
  const { signature, reset } = useStore();
  const navigate = useNavigate();

  return (
    <main className={styles.authContainer}>
      <section className="grid space-y-5">
        <h3 className="text-2xl font-medium">Transaction Content:</h3>
        <div className="w-full h-60 bg-gray-200">
          <p className="break-all">{signature}</p>
        </div>
        <p className="text-blue-500">
          Please confirm the transaction content before sending. You are still
          able to cancel the transaction in this step.
        </p>
      </section>
      <footer className="mt-10 flex justify-center">
        <Button
          className="px-10"
          onClick={() => {
            reset();
            navigate(ROUTES.HOME);
          }}
        >
          Home
        </Button>
      </footer>
    </main>
  );
};

export default SendTX;
