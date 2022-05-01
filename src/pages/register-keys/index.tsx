import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import React from "react";
import AddKey from "./add-key";
import closeIcon from "assets/imgs/close-circle-fill.svg";
import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const RegisterKeys = observer(() => {
  const {
    registerStore,
    registerStore: { privateKeys },
  } = useStores();
  const navigate = useNavigate();

  const onRemove = (index: number) => {
    const _privateKeys = privateKeys.filter((key, _index) => index !== _index);
    registerStore.updatePrivateKeys(_privateKeys);
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
                  <span className="ml-2 p-1 border bg-gray-300 w-96">
                    {privateKey.key}
                  </span>
                  <span className="ml-2 w-32 p-1 border bg-gray-300">
                    {privateKey.type}
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
          onClick={() => navigate(ROUTES.DELEGATE_SETTINGS)}
          disable={privateKeys.length === 0}
        >
          CONTINUE
        </Button>
      </footer>
    </section>
  );
});
export default RegisterKeys;
