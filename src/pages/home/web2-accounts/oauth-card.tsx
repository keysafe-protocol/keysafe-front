import { OAuthOrg, OAuthType, PostMesaageType } from "constants/enum";
import React, { FC, useEffect, useMemo } from "react";
import googleIcon from "assets/imgs/google.svg";
import githubIcon from "assets/imgs/github.svg";
import twitterIcon from "assets/imgs/twitter.svg";
import checkedIcon from "assets/imgs/check.svg";
import classNames from "classnames";
import oauth from "utils/oauth";
import styles from "./index.module.less";
import oauthServices from "stores/oauth/services";
import message from "utils/message";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import { OAuthInfo } from "stores/oauth/types";
import { findIndex } from "lodash-es";

const iconMap: Record<OAuthOrg, string> = {
  [OAuthOrg.Github]: githubIcon,
  [OAuthOrg.Google]: googleIcon,
  [OAuthOrg.Twitter]: twitterIcon,
};

type Props = {
  type: OAuthOrg;
  oauthInfo: OAuthInfo | undefined;
};
const OAuthCard: FC<Props> = observer(({ type, oauthInfo }) => {
  const { oauthStore } = useStores();

  useEffect(() => {
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const connected = useMemo(() => {
    return oauthInfo?.org === type;
  }, [oauthInfo]);

  const isSupport = useMemo(() => {
    return [OAuthOrg.Github].includes(type);
  }, [type]);

  const onMessage = async (e: MessageEvent) => {
    const data = e.data;
    if (data.type === PostMesaageType.OAuthSuccess) {
      const res = await oauthServices.oauth({
        code: data.data,
        org: OAuthOrg.Github,
      });
      await oauthStore.loadOAuthInfo();
      message({
        content: (
          <div>
            <h3 className="text-center text-basecolor">
              Authorization is successful
            </h3>
            <pre
              className="mt-2 overflow-auto"
              style={{ maxHeight: `calc(100vh - 10rem)` }}
            >
              {JSON.stringify(JSON.parse(res.profile || ""), null, 2)}
            </pre>
          </div>
        ),
        closable: true,
        duration: 9999,
      });
      window.removeEventListener("message", onMessage);
    }
  };

  const onVerify = () => {
    if (!isSupport) return;
    oauth.open();
    window.addEventListener("message", onMessage);
  };

  const onView = () => {
    message({
      content: (
        <div>
          <h3 className="text-center text-basecolor">View Profile</h3>
          <pre
            className="mt-2 overflow-auto"
            style={{ maxHeight: `calc(100vh - 10rem)` }}
          >
            {JSON.stringify(JSON.parse(oauthInfo?.tee_profile || ""), null, 2)}
          </pre>
        </div>
      ),
      closable: true,
      duration: 9999,
    });
  };

  return (
    <div
      className={classNames(
        styles["card"],
        "border rounded-3xl px-4 py-1 mr-4 bg-white border-2 relative cursor-pointer",
        {
          "border-basecolor": connected,
          "border-gray-400": !connected,
        }
      )}
    >
      <div className="flex flex-col items-center">
        <img src={iconMap[type]} className="w-20" />
        <div className="mt-2 font-bold">{type}</div>
      </div>
      <div className="mt-6 text-sm">
        {connected ? (
          <span className="flex">
            Connected <img src={checkedIcon} className="w-3 ml-1" />
          </span>
        ) : (
          "Unconnected"
        )}
      </div>
      {!connected && (
        <div
          className={classNames(
            styles["connect"],
            "absolute left-0 top-0 right-0 bottom-0 bg-gray-300 rounded-3xl flex flex-col justify-center hidden"
          )}
        >
          <div className="text-center">
            <span
              className="inline-block text-center text-sm leading-none bg-baseblue rounded-2xl px-4 py-1 text-white cursor-pointer"
              onClick={onVerify}
            >
              Verify <br /> & <br /> Connect
            </span>
          </div>
        </div>
      )}
      {connected && (
        <div
          className={classNames(
            styles["connect"],
            "absolute bg-basecolor rounded-3xl flex flex-col justify-center hidden"
          )}
          style={{ left: -2, top: -2, right: -2, bottom: -2 }}
        >
          <div className="text-center">
            <span
              className="inline-block text-center text-sm leading-none bg-baseblue rounded-2xl px-4 py-1 text-white cursor-pointer"
              onClick={onView}
            >
              View <br /> Profile
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
export default OAuthCard;
