import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import { useCountDown } from "ahooks";
import dayjs from "dayjs";

import useStore, { AuthType } from "./useStore";
import number from "utils/number";
import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/check.svg";

import styles from "./index.module.less";

const AuthEmail = () => {
  const { activeAuth, setActiveAuth, getAuth, setAuth } = useStore();
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

  const handleSend = () => {
    setTargetDate(dayjs().add(60, "s").toDate());
    setSent(true);
    setShowVerify(true);
    setVerified(false);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const handleConfirm = () => {
    const auth = getAuth(AuthType.EMAIL);
    setAuth({
      ...auth,
      success: true,
      email: email,
      shard: "email test shard",
    });
    setActiveAuth(null);
  };

  useEffect(() => {
    setEmailValid(email.length > 0 && regexp.test(email));
  }, [email]);

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
            <p className="text-orange-300">
              We have sent a verifdcation code to your email. Fill the blank
              with the code to get verified.
            </p>
            <div className="flex items-center mt-2">
              <Input
                placeholder="Input verification code"
                className="flex-1 mr-4"
                onChange={(e) => setCode(e.target.value)}
              />
              {verified ? (
                <IconCheck className="w-4 h-4" />
              ) : (
                <Button onClick={handleVerify} disable={!code.length}>
                  VERIFY
                </Button>
              )}
            </div>
          </section>
        )}
      </main>
    </Dialog>
  );
};

export default AuthEmail;

const regexp = new RegExp(
  "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);
