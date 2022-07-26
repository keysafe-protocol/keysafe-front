import React, { useEffect, useState } from "react";
import Button from "components/button";
import AuthEmail from "./AuthEmail";
import AuthGoogle from "./AuthGoogle";
import AuthPass from "./AuthPass";
import useStore, { AuthType, StepType } from "./useStore";
import styles from "./index.module.less";
import AuthGithubOAuth from "./AuthGithubOAuth";
import RecoverServices from "stores/recover/services";

const Auth = () => {
  const {
    shards,
    activeAuth,
    auths,
    userInfo,
    getAuth,
    setActiveAuth,
    setStep,
    setAuths,
  } = useStore();
  const [readyRecover, setReadyRecover] = useState(false);
  const authEmail = getAuth(AuthType.EMAIL);
  const authPass = getAuth(AuthType.PASS);
  const authGoogle = getAuth(AuthType.GOOGLE);
  const authGithubOAuth = getAuth(AuthType.GithubAuth);
  const [authByAccount, setAuthByAccount] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await RecoverServices.getAuthByAccount({
        account: userInfo.email!,
      });
      setAuthByAccount(data);
      const enabledAuths = auths.map((auth) => ({
        ...auth,
        enable: data.includes(auth.type),
      }));
      setAuths(enabledAuths);
    };
    fetch();
  }, []);

  useEffect(() => {
    setReadyRecover(shards.length >= 2);
  }, [shards.length]);

  return (
    <div className={styles.authContainer}>
      <div className="grid gap-6">
        {authByAccount.includes("email") && (
          <section className={className(authEmail.success)}>
            <h3>Key Segment 1/3</h3>
            <div className="mt-5 px-10">
              {authEmail.success ? (
                <span>AUTH passed: Email Verification, {authEmail.email}</span>
              ) : (
                <Button
                  type="primary"
                  disable={readyRecover}
                  onClick={() => setActiveAuth(AuthType.EMAIL)}
                >
                  RETRIEVE
                </Button>
              )}
            </div>
          </section>
        )}
        {authByAccount.includes("password") && (
          <section className={className(authPass.success)}>
            <h3>Key Segment 2/3</h3>
            <div className="mt-5 px-10">
              {authPass.success ? (
                <span>AUTH passed: Passphrase, **********</span>
              ) : (
                <Button
                  type="primary"
                  disable={readyRecover}
                  onClick={() => setActiveAuth(AuthType.PASS)}
                >
                  RETRIEVE
                </Button>
              )}
            </div>
          </section>
        )}
        {authByAccount.includes("gauth") && (
          <section className={className(authGoogle.success)}>
            <h3>Key Segment 3/3</h3>
            <div className="mt-5 px-10">
              {authGoogle.success ? (
                <span>
                  AUTH passed: Google Authenticator, {authGoogle.code}
                </span>
              ) : (
                <Button
                  type="primary"
                  disable={readyRecover}
                  onClick={() => setActiveAuth(AuthType.GOOGLE)}
                >
                  RETRIEVE
                </Button>
              )}
            </div>
          </section>
        )}
        {authByAccount.includes("oauth@github") && (
          <section className={className(authGithubOAuth.success)}>
            <h3>Signature #4</h3>
            <div className="mt-5 px-10">
              {authGoogle.success ? (
                <span>AUTH passed: Github OAuth</span>
              ) : (
                <Button
                  type="primary"
                  disable={readyRecover}
                  onClick={() => setActiveAuth(AuthType.GithubAuth)}
                >
                  RETRIEVE
                </Button>
              )}
            </div>
          </section>
        )}
      </div>

      <footer className="mt-10 flex justify-center">
        <Button
          type="primary"
          className="mr-4 px-10"
          disable={!readyRecover}
          onClick={() => setStep(StepType.SHARD)}
        >
          SUBMIT
        </Button>
        <Button className="px-10" onClick={() => setStep(StepType.ACCOUNT)}>
          GO BACK
        </Button>
      </footer>

      {activeAuth === AuthType.EMAIL && <AuthEmail />}
      {activeAuth === AuthType.PASS && <AuthPass />}
      {activeAuth === AuthType.GOOGLE && <AuthGoogle />}
      {activeAuth === AuthType.GithubAuth && <AuthGithubOAuth />}
    </div>
  );
};

export default Auth;

const className = (success: boolean | undefined) =>
  `p-6 rounded-lg border shadow-sm text-center ${success ? "bg-authpass" : "bg-authfail"
  }`;
