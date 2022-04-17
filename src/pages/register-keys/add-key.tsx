import React from "react";
import { useState } from "react";
import Input from "../../components/input";
import Dialog from "rc-dialog";
import Button from "../../components/button";

const AddKey = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <main>
          <p>Input a private key</p>
          <select>
            <option value="ethereum">ethereum</option>
            <option value="btc">btc</option>
          </select>
          <Input />
          <footer className="mt-4">
            <Button type="primary" className="mr-2">
              CONFIRM
            </Button>
            <Button onClick={() => setVisible(false)}>CANCEL</Button>
          </footer>
        </main>
      </Dialog>
      <div onClick={() => setVisible(true)}>Add a private key</div>
    </>
  );
};
export default AddKey;
