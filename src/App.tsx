import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/home";
import Register from "./pages/sign-up";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />}></Route>
        <Route path={ROUTES.SIGN_UP} element={<Register />}></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
