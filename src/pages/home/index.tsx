import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-start mt-40 ml-20">
        <h2 className="text-6xl font-bold">Keysafe</h2>
        <p className="mt-4 ">
          The decentralized key custody network, powered by Keysafe Protocol.
        </p>
        <div className="flex flex-col mt-10">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-full w-28 py-1 bg-green-500 text-center text-white font-bold"
          >
            LOG IN
          </Link>
          <Link
            to={ROUTES.SIGN_UP}
            className="rounded-full w-28 py-1 bg-yellow-500 text-center text-white font-bold mt-2"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
