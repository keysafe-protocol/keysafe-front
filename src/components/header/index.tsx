import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import Dropdown from "rc-dropdown";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "rc-menu";

const Header = observer(() => {
  const {
    accountStore: { accountChains, userInfo },
  } = useStores();
  const { pathname } = useLocation();

  const transferLinks = [
    <Link to={ROUTES.TRANSFER}>Transfer</Link>,
    <Link to={ROUTES.RECOVER_KEYS}>Recover</Link>,
  ];

  return (
    <header
      className="flex justify-between items-center h-16 px-4"
      style={{ background: "#343434" }}
    >
      <h1 className="text-3xl font-bold  text-white">
        <Link to={ROUTES.HOME}>Keysafe Protocol Demo</Link>
      </h1>
      <nav className="text-white">
        {/* If user not login, show login link, if no chains info, show register info, otherwise show recover/transfer */}
        {!userInfo.email ? (
          <Link to={ROUTES.LOGIN_HOME}>Login</Link>
        ) : accountChains.length === 0 ? (
          <Link to={ROUTES.REGISTER}>Register</Link>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">
                  {pathname === ROUTES.TRANSFER
                    ? transferLinks[0]
                    : transferLinks[1]}
                </Menu.Item>
              </Menu>
            }
          >
            {pathname === ROUTES.TRANSFER ? transferLinks[1] : transferLinks[0]}
          </Dropdown>
        )}
      </nav>
    </header>
  );
});
export default Header;
