import React from "react";
import Dialog from "rc-dialog";
import { useState } from "react";
import { FC } from "react";
import { PropsWithChildren } from "react";
import Button from "components/button";
import { AccountChain } from "stores/account/types";
import registerServices from "stores/register/services";
import useStores from "hooks/use-stores";
import { CHAIN_TYPE_MAP } from "constants/index";

type Props = {
  chain: AccountChain;
} & PropsWithChildren<unknown>;
const DeleteKey: FC<Props> = ({ chain, children }) => {
  const [visible, setVisible] = useState(false);
  const {
    accountStore,
    accountStore: { userInfo },
  } = useStores();

  const onConfirmClick = async () => {
    await registerServices.deleteSeal({
      account: userInfo.email!,
      chain: chain.chain,
      chain_addr: chain.chain_addr,
    });
    await accountStore.loadUserInfo();
    setVisible(false);
  };

  return (
    <>
      <Dialog
        visible={visible}
        title="Warning"
        onClose={() => setVisible(false)}
        footer={
          <footer className="flex justify-center">
            <Button type="primary" className="mr-2" onClick={onConfirmClick}>
              CONFIRM
            </Button>
            <Button onClick={() => setVisible(false)}>CANCEL</Button>
          </footer>
        }
      >
        <main>
          <p className="text-blue-500 text-sm mb-2">
            Please confirm the information of the key to be deleted:
          </p>
          <p>
            <strong>Network:</strong> {CHAIN_TYPE_MAP[chain.chain]}
          </p>
          <p>
            <strong>Account:</strong> {chain.chain_addr}
          </p>
        </main>
      </Dialog>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            ...children.props,
            onClick: (...args: any[]) => {
              children.props?.onClick?.(...args);
              setVisible(true);
            },
          })
        : children}
    </>
  );
};
export default DeleteKey;
