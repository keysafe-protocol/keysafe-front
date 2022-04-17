import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 bg-gray-700 px-4">
      <h1 className="text-3xl font-bold  text-white">
        <Link to={ROUTES.HOME}>Keysafe Protocol Demo</Link>
      </h1>
      <nav className="text-white">
        <Link to={ROUTES.REGISTER}>Register</Link>
      </nav>
    </header>
  );
};
export default Header;
