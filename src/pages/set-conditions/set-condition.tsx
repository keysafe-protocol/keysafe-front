import { useCountDown } from "ahooks";
import Button from "components/button";
import Input from "components/input";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Dialog from "rc-dialog";
import React, { useState } from "react";
import { Condition } from "stores/condition/type";
import { formatCountDown } from "utils";

const INIT_CONDITION: Condition = {
  type: "email",
  value: "",
};
const SetCondition = observer(() => {
  const [visible, setVisible] = useState(false);
  const [condition, setCondition] = useState<Condition>(INIT_CONDITION);
  const [endDate, setEndDate] = useState<Date>();
  const [countDown] = useCountDown({
    targetDate: endDate,
  });

  const renderCondition = () => {
    switch (condition.type) {
      case "email":
        return (
          <div>
            <Input />
            <div>
              {countDown > 0 ? (
                <Button disabled>RESEND({formatCountDown(countDown)}s)</Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() =>
                    setEndDate(
                      dayjs()
                        .add(60, "s")
                        .toDate()
                    )
                  }
                >
                  VERIFY EMAIL
                </Button>
              )}
            </div>
            {countDown > 0 && (
              <div>
                <p>
                  We have sent a verification code to your email. Fill the blank
                  with the code to get verified.
                </p>
                <div>
                  <Input />
                  <span>VERIFY</span>
                </div>
              </div>
            )}
          </div>
        );
      case "passphrase":
        return null;
      case "mobile":
        return null;
    }
  };

  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <div>
          <p className="font-bold mb-2">Set Auth Condition:</p>
          <div className="flex">
            <span>Select Auth Type:</span>
            <select>
              <option value="email">Email</option>
              <option value="passphrase">Passphrase</option>
              <option value="mobile">Mobile Phone</option>
            </select>
          </div>
          {renderCondition()}
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
