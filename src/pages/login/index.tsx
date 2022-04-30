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
import { LOCAL_STORAGE_KEY_ACCOUNT } from "constants/index";

// 输入邮箱
const StepEmail: FC<{
  email: string;
  onEmailChange: (email: string) => void;
}> = ({ email, onEmailChange }) => {
  return (
    <div className="">
      <p>Log in Keysafe with your email:</p>
      <Input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <aside className="mt-4 text-sm">
        Or <Link to={ROUTES["SIGN_UP"]}>Sign up</Link> for a keysafe account
      </aside>
    </div>
  );
};

// 输入验证码
const StepCode: FC<{
  email: string;
  code: string;
  onCodeChange: (code: string) => void;
}> = ({ email, code, onCodeChange }) => {
  const [endDate] = useState(
    dayjs()
      .add(60, "s")
      .toDate()
  );
  const [countDown] = useCountDown({
    targetDate: endDate,
  });
  return (
    <div>
      <p className="text-sm text-justify">
        We've sent a verification code to your email {email}. To continue with
        your login, please fill in with the verification code:
      </p>
      <Input value={code} onChange={(e) => onCodeChange(e.target.value)} />
      <p>
        <span>Resend({formatCountDown(countDown)})</span>
      </p>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const onContinueClick = async () => {
    if (step === 1) {
      await accountServices.auth({ account: email });
      setStep(2);
    } else {
      await accountServices.authConfirm({
        account: email,
        mail: email,
        cipher_code: code,
      });
      ls.set(LOCAL_STORAGE_KEY_ACCOUNT, email);
      navigate(ROUTES.HOME);
    }
  };

  return (
    <section className="flex justify-center items-center ks-full-container">
      {/* 登录框 */}
      <div
        className="border rounded border-gray-700 px-20 py-10"
        style={{ width: 480 }}
      >
        {/* 输入框 */}
        <main className="h-40">
          {step === 1 ? (
            <StepEmail email={email} onEmailChange={setEmail} />
          ) : (
            <StepCode email={email} code={code} onCodeChange={setCode} />
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
};
export default Login;
