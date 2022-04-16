import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home />}></Route>
        <Route path={ROUTES.register} element={<Register />}></Route>
        <Route path={ROUTES.login} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
