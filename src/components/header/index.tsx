import { ROUTES } from "constants/routes";
import useStores from "hooks/use-stores";
import { observer } from "mobx-react-lite";
import Dropdown from "rc-dropdown";
import React from "react";
import { Link } from "react-router-dom";
import Menu from "rc-menu";

const Header = observer(() => {
  const {
    accountStore,
    accountStore: { accountChains },
  } = useStores();

  return (
    <header className="flex justify-between items-center h-16 bg-gray-700 px-4">
      <h1 className="text-3xl font-bold  text-white">
        <Link to={ROUTES.HOME}>Keysafe Protocol Demo</Link>
      </h1>
      <nav className="text-white">
        {/* If user not login, show login link, if no chains info, show register info, otherwise show recover/transfer */}
        {!accountStore.getUserInfo().email ? (
          <Link to={ROUTES.LOGIN_HOME}>Login</Link>
        ) : accountChains.length === 0 ? (
          <Link to={ROUTES.REGISTER}>Register</Link>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="transfer">
                  <Link to={ROUTES.TRANSFER}>Transfer</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <Link to={ROUTES.RECOVER_KEYS}>Recover</Link>
          </Dropdown>
        )}
      </nav>
    </header>
  );
});
export default Header;
