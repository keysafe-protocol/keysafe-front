import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-start mt-40 ml-20">
        <Link to={ROUTES.login}>LOG IN</Link>
        <Link to={ROUTES.register}>SIGN UP</Link>
      </div>
    </div>
  );
};
export default Home;
