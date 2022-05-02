import Button from "components/button";
import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import useStore from "./useStore";

const Export = () => {
  const { reset, privateKey } = useStore();
  const navigate = useNavigate();

  return (
    <main className={styles.authContainer}>
      <section className="grid space-y-5">
        <h3 className="text-2xl font-medium">Private Key:</h3>
        <div className="w-full h-60 bg-gray-200">
          <p className="break-all">{privateKey}</p>
        </div>
      </section>
      <footer className="mt-10 flex justify-center">
        <Button
          className="mr-4 px-10"
          onClick={() => {
            reset();
            navigate(ROUTES.HOME);
          }}
        >
          HOME
        </Button>
      </footer>
    </main>
  );
};

export default Export;
