import React from "react";
import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { observer } from "mobx-react-lite";
import { keyShares } from "utils";
import useStores from "hooks/use-stores";
import { PrivateKey } from "stores/register/types";
import registerServices from "stores/register/services";
import { privateKeyToAddress } from "utils/eth";
import message from "utils/message";

const RegisterConfirm = observer(() => {
  const navigate = useNavigate();
  const {
    registerStore,
    registerStore: { conditions, privateKeys, delegateInfo },
    accountStore,
    accountStore: { userInfo },
  } = useStores();

  const onSubmitClick = async () => {
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
        ...conditions.map((condition, index) => {
          const { type: conditionType } = condition;
          return registerServices.seal({
            account: userInfo.email!,
            chain: type,
            chain_addr: chainAddr,
            cond_type: conditionType!,
            cipher_secret: shares[index],
          });
        }),
      ];
    }, [] as Promise<unknown>[]);
    // seal all shared secrets
    await Promise.all(promises);
    if (delegateInfo.delegate) {
      await registerServices.delegate({
        account: userInfo.email!,
        to: delegateInfo.to,
      });
    }
    await accountStore.loadUserInfo();
    registerStore.clearRegisterInfo();
    navigate(ROUTES.REGISTER_SUCCESS);
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-blue-500">One more click...</h2>
      <article className="mt-6">
        <p>You have finished all steps to register your private key(s)!</p>
        <p className="mt-2">
          Click on <strong>‘SUBMIT’</strong> button to confirm your registry.
          After submitted, your private key(s) will be in decentralized custody
          by Keysafe Network, and you (as well as your Delegate, if you have
          one) will be able to access to or recover your private key(s) anytime,
          anywhere.
        </p>
      </article>
      <footer className="flex mt-10 items-center justify-center">
        <Button type="primary" onClick={onSubmitClick}>
          SUBMIT
        </Button>
        <Button onClick={() => navigate(-1)} className="ml-4">
          GO BACK
        </Button>
      </footer>
    </section>
  );
});
export default RegisterConfirm;
