import React from "react";
import { observer } from "mobx-react-lite";
import LoginSteps from "./login-steps";

const Login = observer(() => {
  return (
    <section className="flex justify-center items-center ks-full-container">
      <LoginSteps type="login" />
    </section>
  );
});
export default Login;
