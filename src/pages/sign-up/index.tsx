import React from "react";
import { observer } from "mobx-react-lite";
import LoginSteps from "pages/login/login-steps";

const SignUp = observer(() => {
  return (
    <section className="flex justify-center items-center ks-full-container">
      <LoginSteps type="sign-up" />
    </section>
  );
});
export default SignUp;
