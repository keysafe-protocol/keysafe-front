import React, { useRef } from "react";
import { useState } from "react";
import Input from "components/input";
import Dialog from "rc-dialog";
import Button from "components/button";
import plusIcon from "assets/imgs/plus-circle-fill.svg";
import { PrivateKey } from "stores/register/types";
import { useContext } from "react";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";

const INIT_PRIVATEKEY: PrivateKey = {
  type: "eth",
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

  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <main>
          <p className="font-bold mb-2">Input a private key</p>
          <div className="mb-2">
            <select
              className="border border-gray-700 rounded w-full px-2 py-1"
              value={privateKey.type}
              onChange={(e) => onValueChange("type", e.target.value)}
            >
              <option value="eth">eth</option>
              <option value="btc">btc</option>
            </select>
          </div>
          <div>
            <Input
              value={privateKey.key}
              onChange={(e) => onValueChange("key", e.target.value)}
            />
          </div>
          <footer className="flex justify-center mt-4">
            <Button type="primary" className="mr-2" onClick={onConfirmClick}>
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
