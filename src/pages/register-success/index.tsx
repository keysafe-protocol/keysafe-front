import React from "react";
import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  return (
    <section className="p-4">
      <h2 className="mt-20 font-bold text-2xl text-green-500">
        Congratulations!{" "}
      </h2>
      <p className=" text-green-500 mt-4">
        You have successfully registered your private key(s) to Keysafe’s
        decentralized custody network!
      </p>
      <footer className="mt-10">
        <Button onClick={() => navigate(ROUTES.HOME)}>HOME</Button>
      </footer>
    </section>
  );
};
export default RegisterSuccess;
