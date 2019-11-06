import React from "react";
import Home from "./Home";
import MainContainer from "../components/MainContainer";
import { Router } from "@reach/router";

const loadProducts = () => import("../pages/Products");
const loadProfile = () => import("../pages/Profile");
const loadAbout = () => import("../pages/About");
const loadNotFound = () => import("../pages/NotFound");
const ProductsLazy = React.lazy(loadProducts);
const ProfileLazy = React.lazy(loadProfile);
const AboutLazy = React.lazy(loadAbout);
const NotFoundLazy = React.lazy(loadNotFound);

const AuthenticatedApp = ({ user }) => {
  React.useEffect(() => {
    loadProducts();
    loadProfile();
    loadAbout();
    loadNotFound();
  }, []);

  return (
    <MainContainer user={user}>
      <Router>
        <Home path="/" user={user} />
        <ProfileLazy path="/profile" user={user} />
        <ProductsLazy path="/products" user={user} />
        <AboutLazy path="/about" />
        <NotFoundLazy default />
      </Router>
    </MainContainer>
  );
};

export default AuthenticatedApp;
