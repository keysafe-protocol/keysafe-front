import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import useStore, { AuthType } from "./useStore";

import Button from "components/button";
import styles from "./index.module.less";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/check.svg";

const AuthGoogle = () => {
  const { activeAuth, setActiveAuth, getAuth, setAuth } = useStore();
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);

  const handleConfirm = () => {
    const auth = getAuth(AuthType.GOOGLE);
    setAuth({ ...auth, success: true, code, shard: "test shard" });
    setActiveAuth(null);
  };

  useEffect(() => {
    setValid(code.length >= 6);
  }, [code]);

  return (
    <Dialog
      visible={activeAuth === AuthType.GOOGLE}
      onClose={() => setActiveAuth(null)}
      rootClassName={styles.dialogRoot}
      title="AUTH #3"
      footer={
        <footer className="text-center">
          {valid && (
            <Button type="primary" className="mr-2" onClick={handleConfirm}>
              CONFIRM
            </Button>
          )}
          <Button onClick={() => setActiveAuth(null)}>CANCEL</Button>
        </footer>
      }
    >
      <main>
        <section>
          <h5>Auth Type: Google Authenticator</h5>
          <div className="flex items-center">
            <Input
              className="flex-1"
              onChange={(e) => setCode(e.target.value)}
            />
            <span className="ml-4 w-4">
              {valid && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
        </section>
      </main>
    </Dialog>
  );
};

export default AuthGoogle;
