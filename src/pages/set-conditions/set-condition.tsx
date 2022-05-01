import { useCountDown, useRequest } from "ahooks";
import Button from "components/button";
import Input from "components/input";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Dialog from "rc-dialog";
import React, { useState, ChangeEvent, FC } from "react";
import { checkEmail, formatCountDown, gauthKey } from "utils";
import useStores from "hooks/use-stores";
import { Condition } from "stores/register/types";
import registerServices from "stores/register/services";
import { useMemo } from "react";
import { findIndex, isEmpty, uniq } from "lodash-es";
import { ConditionType } from "constants/enum";
import { QRCodeSVG } from "qrcode.react";
import { encrypt2 } from "utils/secure";

const INIT_CONDITION: Condition = {
  type: undefined,
  value: "",
  code: "",
  repeatPassPhrase: "",
};
type Props = {
  conditionIndex: number;
};
const SetCondition: FC<Props> = observer(({ conditionIndex }) => {
  const {
    registerStore,
    registerStore: { conditions },
    accountStore: { userInfo },
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

  const typeOptions = useMemo(() => {
    const types = uniq([
      condition.type,
      ...Object.values(ConditionType).filter(
        (type) => findIndex(conditions, { type: type }) === -1
      ),
    ]);
    return types;
  }, [conditions]);

  const { loading: gauthLoading } = useRequest(
    async () => {
      if (condition.type === ConditionType.GAuth) {
        const res = await registerServices.registerGAuth({
          account: userInfo.email!,
        });
        setCondition({
          ...condition,
          value: res.gauth,
        });
      }
    },
    {
      refreshDeps: [condition.type],
    }
  );

  const onValueChange = (e: ChangeEvent<any>) => {
    setCondition({
      ...condition,
      value: e.target.value,
    });
  };

  const onConfirmClick = async () => {
    switch (condition.type) {
      case ConditionType.Email:
        await registerServices.registerMail({
          account: userInfo.email!,
          mail: condition.value,
          cipher_mail: encrypt2(condition.value),
          cipher_code: encrypt2(condition.code!),
        });
        break;
      case ConditionType.Passphrase:
        await registerServices.registerPassphrase({
          account: userInfo.email!,
          cipher_code: encrypt2(condition.value),
        });
        break;
      default:
        break;
    }
    const _conditions = conditions.slice();
    _conditions[conditionIndex] = condition;
    registerStore.updateConditions(_conditions);
    setVisible(false);
  };

  const renderCondition = () => {
    switch (condition.type) {
      case ConditionType.Email:
        return (
          <div>
            <Input value={condition.value} onChange={onValueChange} />
            <div className="mt-2">
              {countDown > 0 ? (
                <Button disabled>RESEND({formatCountDown(countDown)}s)</Button>
              ) : (
                <Button
                  type="primary"
                  onClick={async () => {
                    await registerServices.registerMailAuth({
                      account: userInfo.email!,
                      mail: condition.value,
                      cipher_mail: condition.value,
                    });
                    setSended(true);
                    setEndDate(
                      dayjs()
                        .add(60, "s")
                        .toDate()
                    );
                  }}
                  disable={!checkEmail(condition.value)}
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
                  <Input
                    value={condition.code}
                    onChange={(e) =>
                      setCondition({ ...condition, code: e.target.value })
                    }
                  />
                  {/* <span className="ml-2 font-bold text-blue-500 cursor-pointer">
                    VERIFY
                  </span> */}
                </div>
              </div>
            )}
          </div>
        );
      case ConditionType.Passphrase:
        return (
          <div className="mt-6">
            <div>
              <p className="text-xs text-orange-500 mb-2">
                Input your passphrase. Letters, numbers and ‘_’ are allowed.
              </p>
              <Input
                type="password"
                value={condition.value}
                onChange={onValueChange}
              />
            </div>
            <div className="mt-4">
              <p className="text-xs text-orange-500 mb-2">
                Input your passphrase again.
              </p>
              <Input
                type="password"
                value={condition.repeatPassPhrase}
                onChange={(e) =>
                  setCondition({
                    ...condition,
                    repeatPassPhrase: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case ConditionType.GAuth:
        return (
          <div className="mt-4">
            {/* <div ref={qrcodeRef} className="w-60 h-60"></div> */}
            {condition.value && (
              <div className="flex flex-col items-center">
                <QRCodeSVG
                  style={{ width: 300, height: 300 }}
                  value={gauthKey(userInfo.email!, condition.value)}
                />
                <p className="text-center mt-2 text-basecolor">
                  Please scan the QR code with Google Auth, otherwise the
                  authentication information will not be saved normally
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  const disable = useMemo(() => {
    switch (condition.type) {
      case ConditionType.Email:
        return isEmpty(condition.value) || isEmpty(condition.code);
      case ConditionType.Passphrase:
        return (
          isEmpty(condition.value) ||
          isEmpty(condition.repeatPassPhrase) ||
          condition.value !== condition.repeatPassPhrase
        );
      case ConditionType.GAuth:
        return isEmpty(condition.value);
    }
  }, [condition]);

  return (
    <>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <div>
          <p className="font-bold mb-2 text-basecolor">Set Auth Condition:</p>
          <div className="flex mb-2 items-center">
            <span className="mr-1">Select Auth Type:</span>
            <select
              className="block flex-1"
              onChange={(e) =>
                setCondition({ ...condition, type: e.target.value as any })
              }
            >
              {typeOptions.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {renderCondition()}
          <footer className="flex mt-6 justify-center">
            <Button
              type="primary"
              className="mr-4"
              onClick={onConfirmClick}
              disable={disable}
            >
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
