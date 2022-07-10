import useBalance from "hooks/use-balance";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import React from "react";
import { FC } from "react";
import { AccountChain } from "stores/account/types";
import { getBalance } from "utils/eth";
import { optimize } from "utils/numeral";
import ethIcon from "assets/imgs/eth.svg";
import { ChainType } from "constants/enum";
import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { StepType } from "pages/transfer/useStore";
import { StepType as RecoverStepType } from "pages/recover-keys/useStore";
import DeleteKey from "./delete-key";
import { useMemo } from "react";
import bobaIcon from "assets/imgs/boba.png";
import astarIcon from "assets/imgs/astar.png";
import { CHAIN_TYPE_MAP } from "constants/index";
const iconMap: Record<ChainType, string> = {
  [ChainType.Eth]: ethIcon,
  [ChainType.Boba]: bobaIcon,
  [ChainType.Astar]: astarIcon,
};
const commonBtnClass =
  "w-36 h-10 inline-flex items-center justify-center font-bold ml-2  rounded-lg text-white cursor-pointer";
const ChainKey: FC<{ chain: AccountChain; delegate?: boolean }> = ({
  chain,
  delegate = false,
}) => {
  const [selected, setSelected] = useState(false);
  const balance = useBalance({ address: chain.chain_addr });
  const navigate = useNavigate();

  const chainItemClass = classNames(
    `flex items-center justify-between text-sm h-14  border  border-2 rounded-lg px-2 bg-white cursor-pointer`,
    {
      "border-basecolor-200": !delegate,
      "border-baseblue-200": delegate,
      "border-basecolor bg-basecolor-300": selected && !delegate,
      "hover:bg-basecolor-100": !selected && !delegate,
      "border-baseblue bg-baseblue-300": selected && delegate,
      "hover:bg-baseblue-100": !selected && delegate,
    }
  );
  const btnClass = classNames(commonBtnClass, {
    "bg-basecolor": !delegate,
    "bg-baseblue": delegate,
  });

  const onTransferClick = () => {
    navigate(
      `${ROUTES.TRANSFER}?step=${StepType.TRANSFERFORM}&account=${chain.chain}&from=${chain.chain_addr}`
    );
  };

  const onRecoverClick = () => {
    navigate(
      `${ROUTES.RECOVER_KEYS}?step=${RecoverStepType.ACCOUNT}&chain=${chain.chain}&chain_addr=${chain.chain_addr}`
    );
  };

  return (
    <div className="mb-3">
      <div className={chainItemClass} onClick={() => setSelected(!selected)}>
        <span className="inline-flex items-center w-32">
          <img src={iconMap[chain.chain]} className="mr-2 h-4" />
          {CHAIN_TYPE_MAP[chain.chain]}
        </span>
        <span className="px-2">{chain.chain_addr}</span>
        <span className="w-40 text-right">{optimize(balance!)}</span>
      </div>
      {selected && (
        <div className="flex justify-end mt-2">
          <span className={btnClass} onClick={onTransferClick}>
            Make Transfer
          </span>
          {!delegate && (
            <>
              <span className={btnClass} onClick={onRecoverClick}>
                Recover
              </span>
              <DeleteKey chain={chain}>
                <span className={btnClass}>Delete Key</span>
              </DeleteKey>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Accounts = observer(() => {
  const {
    accountStore: { userInfo, accountChains },
  } = useStores();
  const navigate = useNavigate();

  const renderTitle = () => {
    return (
      <div className="flex items-center justify-between px-2 font-bold text-xl mb-4">
        <span className="w-32 ">Network</span>
        <span>Account</span>
        <span className="w-40 text-right ">Balance</span>
      </div>
    );
  };

  const ownKeys = useMemo(() => {
    return accountChains.filter((chain) => chain.owner === userInfo.email);
  }, [accountChains]);
  const delegateKeys = useMemo(() => {
    return accountChains.filter((chain) => chain.owner !== userInfo.email);
  }, [accountChains]);

  const renderEmpty = (text: string) => {
    return (
      <div className="flex justify-center py-8 text-gray-500 text-lg border-2 rounded border-dashed mb-2">
        {text}
      </div>
    );
  };

  return (
    <div className="ml-4 pt-8">
      <div style={{ minHeight: 360 }}>
        <h3 className="text-2xl text-basecolor font-bold">Owned By Me</h3>
        <div className="mt-6">
          {renderTitle()}
          {ownKeys.length > 0
            ? ownKeys.map((chain, index) => (
                <ChainKey key={index} chain={chain} />
              ))
            : renderEmpty("No keys owned by me")}
        </div>
        <span
          className={classNames(commonBtnClass, "bg-basecolor ml-0")}
          onClick={() => navigate(`${ROUTES.REGISTER_KEYS}?from=add-key`)}
        >
          Add keys
        </span>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl text-baseblue font-bold">Me As Delegate</h3>
        <div className="mt-6">
          {renderTitle()}
          {delegateKeys.length > 0
            ? delegateKeys.map((chain, index) => (
                <ChainKey key={index} chain={chain} delegate />
              ))
            : renderEmpty("No keys delegate to me")}
        </div>
      </div>
    </div>
  );
});
export default Accounts;
