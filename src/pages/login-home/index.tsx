import Button from "components/button";
import { ROUTES } from "constants/routes";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-start mt-40 ml-20">
        <h2 className="text-6xl font-bold">Keysafe</h2>
        <p className="mt-4 text-lg">
          The decentralized key custody network, powered by Keysafe Protocol.
        </p>
        <div className="flex flex-col mt-16">
          <Button type="primary" onClick={() => navigate(ROUTES.LOGIN)}>
            LOG IN
          </Button>
          <Button onClick={() => navigate(ROUTES.SIGN_UP)} className="mt-2">
            SIGN UP
          </Button>
          {/* <Link
            to={ROUTES.SIGN_UP}
            className="rounded-full w-28 py-1 bg-yellow-500 text-center text-white font-bold mt-2"
          >
            SIGN UP
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default LoginHome;
