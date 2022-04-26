import Button from "components/button";
import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center ks-full-container">
      <main className="-mt-20 text-center">
        <h2 className="text-6xl font-bold">Register</h2>
        <p className="mt-4">
          Register your private keys to Keysafe's decentralized custody network.
        </p>
        <footer className="mt-20">
          <Button type="primary" onClick={() => navigate(ROUTES.REGISTER_KEYS)}>
            CONTINUE
          </Button>
        </footer>
      </main>
    </section>
  );
};
export default Register;
