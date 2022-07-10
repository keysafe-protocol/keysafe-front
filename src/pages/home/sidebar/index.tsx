import React from "react";
import avatarImg from "assets/imgs/avatar.svg";
import { observer } from "mobx-react-lite";
import useStores from "hooks/use-stores";
import classNames from "classnames";
import useQueryParam from "hooks/use-query-param";
import { HomeMenus } from "constants/enum";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const Sidebar = observer(() => {
  const {
    accountStore,
    accountStore: { userInfo },
  } = useStores();
  const [active = HomeMenus.KeyList, setActive] = useQueryParam("active");
  const navigate = useNavigate();

  const menuClass = (menu: HomeMenus) =>
    classNames("cursor-pointer", {
      "text-basecolor font-bold": menu === active,
    });
  const onMenuClick = (menu: HomeMenus) => {
    setActive(menu);
  };

  return (
    <div className="w-96 ks-full-container bg-white px-16 py-8">
      <div className="flex flex-col items-center">
        <img src={avatarImg} className="w-full" />
        <span className="mt-2 text-xl">{userInfo.email}</span>
        {/* <span className="mt-2 text-base" style={{ color: "#999999" }}>
          USER ID: TODO
        </span> */}
      </div>
      <div className="mt-16">
        <ul className="text-2xl " style={{ lineHeight: "60px" }}>
          <li
            className={menuClass(HomeMenus.KeyList)}
            onClick={() => onMenuClick(HomeMenus.KeyList)}
          >
            My Web3 Accounts
          </li>
          <li
            className={menuClass(HomeMenus.Web2Accounts)}
            onClick={() => onMenuClick(HomeMenus.Web2Accounts)}
          >
            My Web2 Accounts
          </li>
          <li
            className={menuClass(HomeMenus.AuthConditions)}
            onClick={() => onMenuClick(HomeMenus.AuthConditions)}
          >
            My Auth Conditions
          </li>
          <li
            className={menuClass(HomeMenus.GeneralSettings)}
            onClick={() => onMenuClick(HomeMenus.GeneralSettings)}
          >
            General Settings
          </li>
          <li
            className={menuClass(HomeMenus.Logout)}
            onClick={() => {
              accountStore.logout();
              navigate(ROUTES.LOGIN_HOME);
            }}
          >
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
});
export default Sidebar;
