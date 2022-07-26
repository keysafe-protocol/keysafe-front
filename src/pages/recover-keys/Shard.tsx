import classNames from "classnames";
import Button from "components/button";
import React, { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import useStore, { StepType } from "./useStore";
import styles from "./index.module.less";

const Shard = () => {
  const { shards, auths, setStep, reset, setPrivateKey } = useStore();
  const [status, setStatus] = useState(0);

  const handleRecover = () => {
    setStatus(1);
    setTimeout(() => {
      setStatus(2);
    }, 3000);
    const comb = window.secrets.combine(shards);
    const key = window.secrets.hex2str(comb);
    setPrivateKey(key);
  };

  const reconClass = classNames(reconClassPrefix, {
    "bg-shardready": status === 0,
    "bg-reconstructing": status === 1,
    "bg-authpass": status === 2,
  });

  return (
    <main className={styles.authContainer}>
      <Xwrapper>
        <section className="flex  space-x-6 h-1/3">
          {auths
            .filter((auth) => auth.enable)
            .map((auth, index) => {
              const shardClass = classNames(
                shardClassPrefix,
                auth.success ? "bg-authpass" : "bg-authfail"
              );
              return (
                <div id={`shard${++index}`} key={index} className={shardClass}>
                  <span className="text-4xl">{`Shard #${index}`}</span>
                </div>
              );
            })}
        </section>
        <section id="reconstruction" className={reconClass}>
          <div className="progress rounded-lg"></div>
          <span className="text-3xl font-light">
            {
              [
                "Ready for Private Key Reconstruction",
                "Reconstructing...",
                "Reconstruction Complete",
              ][status]
            }
          </span>
        </section>
        {lines.map((line, i) => (
          <Xarrow
            key={i}
            {...line}
            path="grid"
            startAnchor={["bottom"]}
            endAnchor={["top"]}
            color="#000"
            strokeWidth={2}
            _cpy1Offset={40}
            _cpy2Offset={40}
          />
        ))}
      </Xwrapper>
      <footer className="mt-10 flex justify-center">
        {status === 0 && (
          <>
            <Button
              type="primary"
              className="mr-4 px-10"
              onClick={handleRecover}
            >
              START RECONSTRUCTION
            </Button>
            <Button className="px-10" onClick={() => setStep(StepType.AUTH)}>
              GO BACK
            </Button>
          </>
        )}
        {status === 1 && (
          <p className="text-blue-500">
            Private Key Reconstruction is processed on your local device. All
            data will be cleared after the reconstruction. Your Private Key will
            be safe.
          </p>
        )}
        {status === 2 && (
          <>
            <Button
              type="primary"
              className="mr-4 px-10"
              onClick={() => setStep(StepType.RESULT)}
            >
              EXPORT RESULTS
            </Button>
            <Button className="px-10" onClick={() => reset()}>
              QUIT
            </Button>
          </>
        )}
      </footer>
    </main>
  );
};

export default Shard;

const shardClassPrefix =
  "flex-1 flex items-center justify-center shadow-lg rounded-lg relative";

const reconClassPrefix =
  "mt-40 h-1/6 flex items-center justify-center border shadow-lg rounded-lg";

const lines = [
  {
    start: "shard1",
    end: "reconstruction",
  },
  {
    start: "shard2",
    end: "reconstruction",
  },
  {
    start: "shard3",
    end: "reconstruction",
  },
];
