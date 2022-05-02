import Button from "components/button";
import Input from "components/input";
import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import Switch from "rc-switch";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "utils";

const DelegateSetting = observer(() => {
  const {
    registerStore,
    registerStore: { delegateInfo },
  } = useStores();
  const navigate = useNavigate();

  const onDelegateClick = async () => {
    navigate(ROUTES.SET_CONDITIONS);
  };

  const onDelegateInfoUpdate = (key: string, value: unknown) => {
    registerStore.updateDelegateInfo({
      ...delegateInfo,
      [key]: value,
    });
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold" style={{ color: "#41B06E" }}>
        Delegate Settings
      </h2>
      <main className="mt-4">
        <div className="mb-4">
          <div className="text-lg font-medium">Delegate Access</div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              You can denote someone as your delegate, who will be allowed to
              access your registered private keys (for recovery or/and sig).
            </span>
            <Switch
              checked={delegateInfo.delegate}
              onChange={(checked) => onDelegateInfoUpdate("delegate", checked)}
            />
          </div>
        </div>
        {delegateInfo.delegate && (
          <div className="">
            <div className="text-lg font-medium">Set Your Delegate</div>
            <div className="text-gray-500">
              Set your Delegate (should have been registered before with an
              email account). Your delegate will be allowed to access your
              registered private keys when he or she is authed to Keysafe.
            </div>
            <div className="flex items-center mt-2">
              <Input
                className="w-80"
                value={delegateInfo.to}
                onChange={(e) => onDelegateInfoUpdate("to", e.target.value)}
              />
            </div>
          </div>
        )}
      </main>
      <footer className="mt-20">
        <Button
          type="primary"
          onClick={onDelegateClick}
          disable={delegateInfo.delegate && !checkEmail(delegateInfo.to)}
        >
          CONTINUE
        </Button>
        <Button onClick={() => navigate(-1)} className="ml-4">
          GO BACK
        </Button>
      </footer>
    </section>
  );
});
export default DelegateSetting;
