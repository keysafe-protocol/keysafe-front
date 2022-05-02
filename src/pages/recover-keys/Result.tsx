import Button from "components/button";
import React from "react";
import styles from "./index.module.less";
import useStore from "./useStore";

const Export = () => {
  const { reset, privateKey } = useStore();

  return (
    <main className={styles.authContainer}>
      <section className="grid space-y-5">
        <h3 className="text-2xl font-medium">Private Key:</h3>
        <div className="w-full h-60 bg-gray-200">
          <p className="break-all">{privateKey}</p>
        </div>
      </section>
      <footer className="mt-10 flex justify-center">
        <Button className="mr-4 px-10" onClick={() => reset()}>
          HOME
        </Button>
      </footer>
    </main>
  );
};

export default Export;
