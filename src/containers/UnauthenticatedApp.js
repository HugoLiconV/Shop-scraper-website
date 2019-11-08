import React from "react";
import MainContainer from "../components/MainContainer";
import Home from "../pages/Home";
import { Router } from "@reach/router";

const loadCreateAccount = () => import("../pages/CreateAccount");
const loadLogin = () => import("../pages/Login");
const loadAbout = () => import("../pages/About");
const loadNotFound = () => import("../pages/NotFound");
const loadResetPassword = () => import("../pages/ResetPassword");
const loadForgotPassword = () => import("../pages/ForgotPassword");
const CreateAccountLazy = React.lazy(loadCreateAccount);
const LoginLazy = React.lazy(loadLogin);
const AboutLazy = React.lazy(loadAbout);
const NotFoundLazy = React.lazy(loadNotFound);
const ForgotPasswordLazy = React.lazy(loadForgotPassword);
const ResetPasswordLazy = React.lazy(loadResetPassword);

const UnauthenticatedApp = () => {
  React.useEffect(() => {
    loadCreateAccount();
    loadLogin();
    loadAbout();
    loadNotFound();
    loadResetPassword();
    loadForgotPassword();
  }, []);

  return (
    <MainContainer>
      <Router>
        <LoginLazy path="/login" />
        <CreateAccountLazy path="/create-account" />
        <AboutLazy path="/about" />
        <Home path="/" />
        <ResetPasswordLazy path="/reset-password/:token" />
        <ForgotPasswordLazy path="/forgot-password" />
        <NotFoundLazy default />
      </Router>
    </MainContainer>
  );
};

export default UnauthenticatedApp;
