import { useCountDown } from "ahooks";
import Button from "components/button";
import Input from "components/input";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Dialog from "rc-dialog";
import React, { useState, ChangeEvent, FC } from "react";
import { Condition } from "stores/condition/type";
import { formatCountDown } from "utils";
import useStores from "hooks/use-stores";

const INIT_CONDITION: Condition = {
  type: "email",
  value: "",
};
type Props = {
  conditionIndex: number;
};
const SetCondition: FC<Props> = observer(({ conditionIndex }) => {
  const {
    conditionStore,
    conditionStore: { conditions },
  } = useStores();
  const [sended, setSended] = useState(false);
  const [visible, setVisible] = useState(false);
  const [condition, setCondition] = useState<Condition>(
    conditions[conditionIndex] || INIT_CONDITION
  );
  const [endDate, setEndDate] = useState<Date>();
  const [countDown] = useCountDown({
    targetDate: endDate,
  });

  const onValueChange = (e: ChangeEvent<any>) => {
    setCondition({
      ...condition,
      value: e.target.value,
    });
  };

  const onConfirmClick = () => {
    const _conditions = conditions.slice();
    _conditions[conditionIndex] = condition;
    conditionStore.updateConditions(_conditions);
    setVisible(false);
  };

  const renderCondition = () => {
    switch (condition.type) {
      case "email":
        return (
          <div>
            <Input value={condition.value} onChange={onValueChange} />
            <div className="mt-2">
              {countDown > 0 ? (
                <Button disabled>RESEND({formatCountDown(countDown)}s)</Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    setSended(true);
                    setEndDate(
                      dayjs()
                        .add(60, "s")
                        .toDate()
                    );
                  }}
                >
                  VERIFY EMAIL
                </Button>
              )}
            </div>
            {sended && (
              <div className="mt-6">
                <p className="text-xs text-orange-500">
                  We have sent a verification code to your email. Fill the blank
                  with the code to get verified.
                </p>
                <div className="flex mt-2 items-center">
                  <Input />
                  <span className="ml-2 font-bold text-blue-500 cursor-pointer">
                    VERIFY
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      case "passphrase":
        return (
          <div className="mt-6">
            <div>
              <p className="text-xs text-orange-500 mb-2">
                Input your passphrase. Letters, numbers and ‘_’ are allowed.
              </p>
              <Input type="password" onChange={onValueChange} />
            </div>
            <div className="mt-4">
              <p className="text-xs text-orange-500 mb-2">
                Input your passphrase again.
              </p>
              <Input type="password" />
            </div>
          </div>
        );
      case "mobile":
        return (
          <div>
            <Input value={condition.value} onChange={onValueChange} />
            <div className="mt-2">
              {countDown > 0 ? (
                <Button disabled>RESEND({formatCountDown(countDown)}s)</Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    setSended(true);
                    setEndDate(
                      dayjs()
                        .add(60, "s")
                        .toDate()
                    );
                  }}
                >
                  VERIFY Mobile
                </Button>
              )}
            </div>
            {sended && (
              <div className="mt-6">
                <p className="text-xs text-orange-500">
                  We have sent a verification code to your mobile phone. Fill
                  the blank with the code to get verified.
                </p>
                <div className="flex mt-2 items-center">
                  <Input />
                  <span className="ml-2 font-bold text-blue-500 cursor-pointer">
                    VERIFY
                  </span>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <div>
          <p className="font-bold mb-2">Set Auth Condition:</p>
          <div className="flex mb-2">
            <span className="mr-1">Select Auth Type:</span>
            <select
              className="border border-gray-700 rounded px-2 py-1 flex-1"
              onChange={(e) =>
                setCondition({ ...condition, type: e.target.value as any })
              }
            >
              <option value="email">Email</option>
              <option value="passphrase">Passphrase</option>
              <option value="mobile">Mobile Phone</option>
            </select>
          </div>
          {renderCondition()}
          <footer className="flex mt-6 justify-center">
            <Button type="primary" className="mr-4" onClick={onConfirmClick}>
              CONFIRM
            </Button>
            <Button onClick={() => setVisible(false)}>CANCEL</Button>
          </footer>
        </div>
      </Dialog>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        SET
      </Button>
    </>
  );
});
export default SetCondition;
