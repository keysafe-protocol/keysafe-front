import Button from "components/button";
import React from "react";
import styles from "./index.module.less";
import useStore from "./useStore";

const Success = () => {
  const { reset } = useStore();

  return (
    <main className={styles.authContainer}>
      <div className="flex flex-col h-full">
        <h1 className="text-4xl font-bold text-authpass">Congratulations!</h1>
        <p className="text-3xl mt-1">
          You transaction is sent. Click{" "}
          <a href="/transfer" className="underline">
            here
          </a>{" "}
          to check Tx Hash.
        </p>
        <footer className="flex justify-center mt-80">
          <Button className="px-10" onClick={() => reset()}>
            HOME
          </Button>
        </footer>
      </div>
    </main>
  );
};

export default Success;
