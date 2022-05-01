import React, { useRef } from "react";
import { useState } from "react";
import Input from "components/input";
import Dialog from "rc-dialog";
import Button from "components/button";
import plusIcon from "assets/imgs/plus-circle-fill.svg";
import { PrivateKey } from "stores/register/types";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import { ChainType } from "constants/enum";
import { isEmpty } from "lodash-es";
import { checkEthKey } from "utils/eth";
import { useMemo } from "react";

const INIT_PRIVATEKEY: PrivateKey = {
  type: ChainType.Eth,
  key: "",
};
const AddKey = observer(() => {
  const {
    registerStore,
    registerStore: { privateKeys },
  } = useStores();
  const [visible, setVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState<PrivateKey>(INIT_PRIVATEKEY);

  const onValueChange = (key: string, value: unknown) => {
    setPrivateKey({
      ...privateKey,
      [key]: value,
    });
  };

  const onConfirmClick = () => {
    registerStore.updatePrivateKeys([...privateKeys, privateKey]);
    setPrivateKey(INIT_PRIVATEKEY);
    setVisible(false);
  };

  const valid = useMemo(() => {
    if (privateKey.key && !checkEthKey(privateKey.key)) return false;
    return true;
  }, [privateKey]);

  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <main>
          <p className="font-bold mb-2">Input a private key</p>
          <div className="mb-2">
            <select
              className="block flex-1 w-full"
              value={privateKey.type}
              onChange={(e) => onValueChange("type", e.target.value)}
            >
              {Object.values(ChainType).map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              value={privateKey.key}
              onChange={(e) => onValueChange("key", e.target.value)}
            />
            {!valid && (
              <p className="mt-2 text-sm text-orange-500">
                Please input valid private key
              </p>
            )}
          </div>
          <footer className="flex justify-center mt-4">
            <Button
              type="primary"
              className="mr-2"
              onClick={onConfirmClick}
              disable={isEmpty(privateKey.key) || !valid}
            >
              CONFIRM
            </Button>
            <Button onClick={() => setVisible(false)}>CANCEL</Button>
          </footer>
        </main>
      </Dialog>
      <div onClick={() => setVisible(true)} className="flex cursor-pointer">
        <img src={plusIcon} className="w-4 mr-1" /> Add{" "}
        {privateKeys.length > 0 ? "another" : "a private"} key
      </div>
    </>
  );
});
export default AddKey;
