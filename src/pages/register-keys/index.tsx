import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import React from "react";
import AddKey from "./add-key";
import closeIcon from "assets/imgs/close-circle-fill.svg";
import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { privateKeyToAddress } from "utils/eth";
import useQueryParam from "hooks/use-query-param";
import { ConditionType } from "constants/enum";
import { keyShares } from "utils";
import registerServices from "stores/register/services";
import message from "utils/message";
import { CHAIN_TYPE_MAP } from "constants/index";
import RecoverServices from "stores/recover/services";

const RegisterKeys = observer(() => {
  const {
    registerStore,
    registerStore: { privateKeys },
    accountStore,
    accountStore: { userInfo },
  } = useStores();
  const navigate = useNavigate();
  const [from] = useQueryParam("from");

  const onRemove = (index: number) => {
    const _privateKeys = privateKeys.filter((key, _index) => index !== _index);
    registerStore.updatePrivateKeys(_privateKeys);
  };

  const onContinueClick = async () => {
    if (from === "add-key") {
      const { data } = await RecoverServices.getAuthByAccount({
        account: userInfo.email!,
      });
      const conditionsByAccount: ConditionType[] = data;
      // seal keys
      const promises = privateKeys.reduce((pre, cur) => {
        const { type, key } = cur;
        const shares = keyShares(key);
        let chainAddr = "";
        try {
          chainAddr = privateKeyToAddress(key);
        } catch (err) {
          message({ content: "invalid secret key" });
          throw Error();
        }

        return [
          ...pre,
          ...conditionsByAccount.map((condition, index) => {
            return registerServices.seal({
              account: userInfo.email!,
              chain: type,
              chain_addr: chainAddr,
              cond_type: condition,
              cipher_secret: shares[index],
            });
          }),
        ];
      }, [] as Promise<unknown>[]);
      // seal all shared secrets
      await Promise.all(promises);
      await accountStore.loadUserInfo();
      registerStore.updatePrivateKeys([]);
      navigate(ROUTES.REGISTER_SUCCESS);
    } else {
      // from register
      navigate(ROUTES.DELEGATE_SETTINGS);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold" style={{ color: "#41B06E" }}>
        Input Private Keys
      </h2>
      <div className="mt-8">
        {privateKeys.length > 0 && (
          <div className="mb-4">
            <div className="text-lg font-bold mb-2">Key List</div>
            {privateKeys.map((privateKey, index) => {
              return (
                <div key={index} className="flex mb-2 items-center">
                  <span className="w-10">#{index + 1}</span>
                  <span
                    className="ml-2 p-1 border bg-gray-300 w-96 text-ellipsis overflow-hidden"
                    title={privateKeyToAddress(privateKey.key)}
                  >
                    {privateKeyToAddress(privateKey.key)}
                  </span>
                  <span className="ml-2 w-32 p-1 border bg-gray-300">
                    {CHAIN_TYPE_MAP[privateKey.type]}
                  </span>
                  <img
                    src={closeIcon}
                    className="w-4 ml-2"
                    onClick={() => onRemove(index)}
                  />
                </div>
              );
            })}
          </div>
        )}
        <AddKey />
      </div>
      <footer className="mt-20">
        <Button
          type="primary"
          onClick={onContinueClick}
          disable={privateKeys.length === 0}
        >
          CONTINUE
        </Button>
        <Button onClick={() => navigate(-1)} className="ml-4">
          CANCEL
        </Button>
      </footer>
    </section>
  );
});
export default RegisterKeys;
