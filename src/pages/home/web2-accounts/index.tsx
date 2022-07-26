import { GITHUB_CLIENT_ID } from "constants/index";
import React from "react";
import oauth from "utils/oauth";
import queryString from "query-string";
import { ROUTES } from "constants/routes";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import { useRequest } from "ahooks";
import { OAuthOrg } from "constants/enum";
import OAuthCard from "./oauth-card";
import { find, findIndex } from "lodash-es";
import Loading from "components/loading";

const Web2Accounts = observer(() => {
  const {
    oauthStore,
    oauthStore: { oauthConnencted },
  } = useStores();

  const { loading } = useRequest(async () => {
    return await oauthStore.loadOAuthInfo();
  });

  if (loading) return <Loading />;

  return (
    <div className="ml-4 pt-8">
      <h3 className="text-2xl text-basecolor font-bold">My Web2 Accounts</h3>
      <div className="flex mt-8">
        {Object.values(OAuthOrg).map((type) => (
          <OAuthCard
            key={type}
            type={type}
            oauthInfo={find(oauthConnencted, { org: type })}
          />
        ))}
      </div>
    </div>
  );
});
export default Web2Accounts;
