import React from "react";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/home";
import Register from "./pages/sign-up";
import Login from "./pages/login";
import styles from "./App.module.less";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route path={ROUTES.SIGN_UP} element={<Register />}></Route>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
