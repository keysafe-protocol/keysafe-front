import React from "react";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import Login from "./pages/login";
import Register from "./pages/register";
import RegisterKeys from "./pages/register-keys";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />}></Route>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
          <Route path={ROUTES.REGISTER} element={<Register />}></Route>
          <Route path={ROUTES.REGISTER_KEYS} element={<RegisterKeys />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
