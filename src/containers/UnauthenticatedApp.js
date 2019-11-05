import React from "react";
import MainContainer from "../components/MainContainer";
import Home from "../pages/Home";
import { Router } from "@reach/router";
import NotFound from "../pages/NotFound";

const loadCreateAccount = () => import("../pages/CreateAccount");
const loadLogin = () => import("../pages/Login");
const loadAbout = () => import("../pages/About");
const CreateAccountLazy = React.lazy(loadCreateAccount);
const LoginLazy = React.lazy(loadLogin);
const AboutLazy = React.lazy(loadAbout);

const UnauthenticatedApp = () => {
  React.useEffect(() => {
    loadCreateAccount();
    loadLogin();
    loadAbout();
  }, []);

  return (
    <MainContainer>
      <Router>
        <LoginLazy path="/login" />
        <CreateAccountLazy path="/create-account" />
        <AboutLazy path="/about" />
        <Home path="/" />
        <NotFound default />
      </Router>
    </MainContainer>
  );
};

export default UnauthenticatedApp;
