import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import useStore, { AuthType } from "./useStore";

import Button from "components/button";
import styles from "./index.module.less";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/imgs/check.svg";
import RecoverServices from "stores/recover/services";
import { ConditionType, PostMesaageType } from "constants/enum";
import { encrypt2 } from "utils/secure";
import oauth from "utils/oauth";
import { PostMesaageData } from "stores/common/types";

const AuthGithubOAuth = () => {
  const {
    activeAuth,
    userInfo,
    accountChain,
    setActiveAuth,
    getAuth,
    setAuth,
  } = useStore();
  const [code, setCode] = useState("");

  useEffect(() => {
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const handleConfirm = async () => {
    const data: any = await RecoverServices.unseal({
      account: userInfo.email!,
      owner: accountChain.owner,
      chain: accountChain.chain,
      chain_addr: accountChain.chain_addr,
      cond_type: ConditionType.OAuthGithub,
      cipher_cond_value: code,
    });
    const auth = getAuth(AuthType.GithubAuth);
    setAuth({ ...auth, success: true, code, shard: data.cipher_secret });
    setActiveAuth(null);
  };

  const onMessage = (e: MessageEvent) => {
    const data: PostMesaageData = e.data;
    if (data.type === PostMesaageType.OAuthSuccess) {
      setCode(data.data);
    }
  };

  const onConnectWithGithub = () => {
    oauth.open();
    window.addEventListener("message", onMessage);
  };

  return (
    <Dialog
      visible={activeAuth === AuthType.GithubAuth}
      onClose={() => setActiveAuth(null)}
      rootClassName={styles.dialogRoot}
      title="AUTH #4"
      footer={
        <footer className="text-center">
          {code && (
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
            {code ? (
              <div className="text-green-500">
                Authorization is successful, click confirm
              </div>
            ) : (
              <div>
                Please log in with{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={onConnectWithGithub}
                >
                  github authorization
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </Dialog>
  );
};

export default AuthGithubOAuth;
