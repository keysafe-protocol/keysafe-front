import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import Dropdown from "rc-dropdown";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "rc-menu";
import arrowIcon from "assets/imgs/arrow-down.svg";

const Header = observer(() => {
  const {
    accountStore: { accountChains, userInfo },
  } = useStores();
  const { pathname } = useLocation();

  return (
    <header
      className="flex justify-between items-center h-16 px-4"
      style={{ background: "#343434" }}
    >
      <h1 className="text-3xl   text-white">
        <Link to={ROUTES.HOME}>
          <span className="text-basecolor font-bold">Shuttle Protocol</span>{" "}
          <span className="ml-4">Demo</span>
        </Link>
      </h1>
      <nav className="text-white border border-white rounded-full h-10 flex items-center justify-center px-6 font-bold">
        {/* If user not login, show login link, if no chains info, show register info, otherwise show recover/transfer */}
        {!userInfo.email ? (
          <Link to={ROUTES.LOGIN_HOME}>Login</Link>
        ) : accountChains.length === 0 ? (
          <Link to={ROUTES.REGISTER}>Register</Link>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="recover">
                  <Link
                    to={ROUTES.RECOVER_KEYS}
                    className="text-base font-bold"
                  >
                    Recover
                  </Link>
                </Menu.Item>
                <Menu.Item key="transfer">
                  <Link to={ROUTES.TRANSFER} className="text-base font-bold">
                    Transfer
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            {/* {pathname === ROUTES.TRANSFER ? transferLinks[1] : transferLinks[0]} */}
            <span className="flex items-center cursor-pointer">
              {pathname === ROUTES.HOME
                ? "My Assets"
                : pathname === ROUTES.TRANSFER
                  ? "Transfer"
                  : "Recover"}
              <img src={arrowIcon} className="ml-2 w-3" />
            </span>
          </Dropdown>
        )}
      </nav>
    </header>
  );
});
export default Header;
