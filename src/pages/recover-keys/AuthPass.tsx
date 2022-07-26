import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import useStore, { AuthType } from "./useStore";

import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/imgs/check.svg";

import styles from "./index.module.less";
import RecoverServices from "stores/recover/services";
import { ConditionType } from "constants/enum";
import { encrypt2 } from "utils/secure";

const AuthPass = () => {
  const {
    activeAuth,
    userInfo,
    accountChain,
    setActiveAuth,
    getAuth,
    setAuth,
  } = useStore();
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);

  const handleConfirm = async () => {
    const data: any = await RecoverServices.unseal({
      account: userInfo.email!,
      owner: accountChain.owner,
      chain: accountChain.chain,
      chain_addr: accountChain.chain_addr,
      cond_type: ConditionType.Passphrase,
      cipher_cond_value: encrypt2(pass),
    });

    const auth = getAuth(AuthType.PASS);
    setAuth({ ...auth, success: true, pass: pass, shard: data.cipher_secret });
    setActiveAuth(null);
  };

  useEffect(() => {
    setValid(pass.length > 0 && regexp.test(pass));
  }, [pass]);

  return (
    <Dialog
      visible={activeAuth === AuthType.PASS}
      onClose={() => setActiveAuth(null)}
      rootClassName={styles.dialogRoot}
      title="AUTH #2"
      footer={
        <footer className="  text-center">
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
        <h5 className="mb-6">Auth Type: Passphrase</h5>
        <section>
          <p className="text-blue-500">
            Input your passphrase. Letters, numbers and ‘_’ are allowed.
          </p>
          <div className="flex items-center">
            <Input
              type="password"
              className="flex-1"
              onChange={(e) => setPass(e.target.value)}
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

export default AuthPass;

const regexp = new RegExp("^[0-9A-Za-z_]{6,}$");
