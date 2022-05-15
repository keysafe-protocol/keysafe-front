import { isEmpty } from "lodash-es";
import React from "react";
import { FC } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCountDown } from "ahooks";
import dayjs from "dayjs";
import Input from "components/input";
import { ROUTES } from "constants/routes";
import Button from "components/button";
import { checkEmail, formatCountDown } from "utils";
import accountServices from "stores/account/services";
import ls from "utils/ls";
import {
  LOCAL_STORAGE_KEY_ACCOUNT,
  LOCAL_STORAGE_TOKEN,
} from "constants/index";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import { encrypt2 } from "utils/secure";

type Props = {
  type: "login" | "sign-up";
};
// 输入邮箱
const StepEmail: FC<{
  email: string;
  onEmailChange: (email: string) => void;
} & Props> = ({ email, onEmailChange, type }) => {
  return (
    <div className="">
      {type === "login" ? (
        <p>Log in Keysafe with your email:</p>
      ) : (
        <p>Sign up with your email:</p>
      )}
      <Input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <aside className="mt-4 text-sm">
        {type === "login" ? (
          <span>
            Or{" "}
            <Link to={ROUTES["SIGN_UP"]} className="text-basecolor underline">
              Sign up
            </Link>{" "}
            for a keysafe account
          </span>
        ) : (
          <span>
            Or{" "}
            <Link to={ROUTES.LOGIN} className="text-basecolor underline">
              Log in
            </Link>{" "}
            if you already have an account
          </span>
        )}
      </aside>
    </div>
  );
};

// 输入验证码
const StepCode: FC<{
  email: string;
  code: string;
  onCodeChange: (code: string) => void;
  onResend: () => void;
} & Props> = ({ email, code, onCodeChange, onResend, type }) => {
  const [endDate, setEndDate] = useState(
    dayjs()
      .add(60, "s")
      .toDate()
  );
  const [countDown] = useCountDown({
    targetDate: endDate,
  });

  const onResendClick = async () => {
    if (countDown > 0) return;
    await onResend();
    setEndDate(
      dayjs()
        .add(60, "s")
        .toDate()
    );
  };

  return (
    <div>
      <p className="text-sm text-justify">
        {type === "login" ? (
          <span>
            We've sent a verification code to your email{" "}
            <strong>{email}</strong>. To continue with your login, please fill
            in with the verification code:
          </span>
        ) : (
          <span>
            We've sent a verification code to your email{" "}
            <strong>{email}</strong>. To continue with your sign-up, please fill
            in with the verification code:
          </span>
        )}
      </p>
      <p className="my-1">
        <span
          className="cursor-pointer text-sm"
          style={{ color: "#9D9999" }}
          onClick={onResendClick}
        >
          Resend{countDown > 0 && <span>({formatCountDown(countDown)})</span>}
        </span>
      </p>
      <Input value={code} onChange={(e) => onCodeChange(e.target.value)} />
    </div>
  );
};

const LoginSteps: FC<Props> = observer(({ type }) => {
  const { accountStore } = useStores();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const onContinueClick = async () => {
    if (step === 1) {
      await accountServices.auth({ account: email });
      setStep(2);
    } else {
      const res = await accountServices.authConfirm({
        account: email,
        mail: email,
        cipher_code: encrypt2(code),
      });
      ls.set(LOCAL_STORAGE_KEY_ACCOUNT, email);
      ls.set(LOCAL_STORAGE_TOKEN, res.token);
      await accountStore.loadUserInfo();
      // accountStore.updateUserInfo({
      //   email: email,
      // });
      navigate(ROUTES.HOME);
    }
  };

  return (
    <section className="flex justify-center items-center ks-full-container">
      {/* 登录框 */}
      <div
        className="border rounded border-gray-700 px-20 py-10"
        style={{ width: 500 }}
      >
        {/* 输入框 */}
        <main className="h-48">
          {step === 1 ? (
            <StepEmail email={email} onEmailChange={setEmail} type={type} />
          ) : (
            <StepCode
              email={email}
              code={code}
              onCodeChange={setCode}
              type={type}
              onResend={() => accountServices.auth({ account: email })}
            />
          )}
        </main>
        {/* 按钮 */}
        <footer className="flex justify-center">
          <Button
            className="mr-4"
            type="primary"
            disable={
              (step === 1 && (isEmpty(email) || !checkEmail(email))) ||
              (step === 2 && isEmpty(code))
            }
            onClick={onContinueClick}
          >
            CONTINUE
          </Button>
          <Button
            onClick={() => (step === 2 ? setStep(1) : navigate(ROUTES.HOME))}
          >
            CANCEL
          </Button>
        </footer>
      </div>
    </section>
  );
});
export default LoginSteps;
