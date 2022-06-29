import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import { useCountDown } from "ahooks";
import dayjs from "dayjs";

import useStore, { AuthType } from "./useStore";
import number from "utils/number";
import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/imgs/check.svg";

import styles from "./index.module.less";
import RecoverServices from "stores/recover/services";
import { ConditionType } from "constants/enum";
import { encrypt2 } from "utils/secure";
import { checkEmail } from "utils";
import registerServices from "stores/register/services";

const AuthEmail = () => {
  const {
    activeAuth,
    accountChain,
    userInfo,
    setActiveAuth,
    getAuth,
    setAuth,
  } = useStore();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [targetDate, setTargetDate] = useState<Date>();
  const [countDown] = useCountDown({
    targetDate,
    onEnd: () => {
      setSent(false);
    },
  });

  const handleSend = async () => {
    await registerServices.registerMailAuth({
      account: userInfo.email!,
      mail: email,
      cipher_mail: email,
    });

    setTargetDate(
      dayjs()
        .add(60, "s")
        .toDate()
    );
    setSent(true);
    setShowVerify(true);
    setVerified(false);
  };

  const handleConfirm = async () => {
    const data: any = await RecoverServices.unseal({
      account: userInfo.email!,
      owner: accountChain.owner,
      chain: accountChain.chain,
      chain_addr: accountChain.chain_addr,
      cond_type: ConditionType.Email,
      cipher_cond_value: encrypt2(code),
    });
    const auth = getAuth(AuthType.EMAIL);
    setAuth({
      ...auth,
      success: true,
      email: email,
      shard: data.cipher_secret,
    });
    setActiveAuth(null);
  };

  const handleChange = (code: string) => {
    setCode(code);
    setVerified(code.length > 0);
  };

  useEffect(() => {
    setEmailValid(email.length > 0 && checkEmail(email));
  }, [email]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await RecoverServices.getMailByAccount({
        account: userInfo.email!,
      });
      console.log(data);
      setEmail(data);
    };
    fetch();
  }, []);

  return (
    <Dialog
      visible={activeAuth === AuthType.EMAIL}
      onClose={() => setActiveAuth(null)}
      rootClassName={styles.dialogRoot}
      title="AUTH #1"
      footer={
        <footer className="  text-center">
          {verified && (
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
          <h5>Auth Type: Email Verification</h5>
          <div className="flex items-center">
            <Input
              className="flex-1"
              placeholder="Input your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <span className="ml-4 w-4">
              {emailValid && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
          {!sent ? (
            <Button
              type="primary"
              className="mt-6"
              disable={!emailValid}
              onClick={handleSend}
            >
              VERIFY EMAIL
            </Button>
          ) : (
            <Button className="mt-6" disable>
              RESEND({Math.round(number.divide(countDown, 1000))}s)
            </Button>
          )}
        </section>
        {showVerify && (
          <section className="mt-10">
            <p className="text-blue-500">
              We have sent a verifdcation code to your email. Fill the blank
              with the code to get verified.
            </p>
            <div className="flex items-center mt-2">
              <Input
                placeholder="Input verification code"
                className="flex-1 mr-4"
                onChange={(e) => handleChange(e.target.value)}
              />
              {verified && <IconCheck className="w-4 h-4" />}
            </div>
          </section>
        )}
      </main>
    </Dialog>
  );
};

export default AuthEmail;
