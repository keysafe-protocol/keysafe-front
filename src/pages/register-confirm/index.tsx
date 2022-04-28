import React from "react";
import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const RegisterConfirm = () => {
  const navigate = useNavigate();
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-blue-500">One more click...</h2>
      <article className="mt-6">
        <p>You have finished all steps to register your private key(s)!</p>
        <p className="mt-2">
          Click on <strong>‘SUBMIT’</strong> button to confirm your registry.
          After submitted, your private key(s) will be in decentralized custody
          by Keysafe Network, and you (as well as your Delegate, if you have
          one) will be able to access to or recover your private key(s) anytime,
          anywhere.
        </p>
      </article>
      <footer className="flex mt-10 items-center justify-center">
        <Button
          type="primary"
          onClick={() => navigate(ROUTES.REGISTER_SUCCESS)}
        >
          SUBMIT
        </Button>
        <Button onClick={() => navigate(-1)} className="ml-4">
          GO BACK
        </Button>
      </footer>
    </section>
  );
};
export default RegisterConfirm;
