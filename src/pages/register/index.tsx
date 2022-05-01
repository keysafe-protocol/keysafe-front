import Button from "components/button";
import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center ks-full-container">
      <h2 className="text-6xl font-bold">Register</h2>
      <p className="mt-4 text-4xl text-center w-3/5 text-zinc-400">
        Register your private keys to Keysafe's decentralized custody network.
      </p>
      <footer className="mt-20">
        <Button type="primary" onClick={() => navigate(ROUTES.REGISTER_KEYS)}>
          CONTINUE
        </Button>
      </footer>
    </section>
  );
};
export default Register;
