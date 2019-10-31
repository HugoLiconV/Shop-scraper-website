import React from "react";
import { Layout, Menu, Icon } from "antd";
import Header from "../components/Header";
import { Router, Link, Match } from "@reach/router";
import Profile from "./Profile";
import AnnouncementForm from "./AnnouncementForm";
import Home from "./Home";
import AnnouncementDetail from "./AnnouncementDetail";

const { Footer, Content } = Layout;

const AuthenticatedApp = ({ user }) => {
  return (
    <Layout
      style={{
        overflow: "auto",
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: 0
      }}
    >
      <Header />
      <Router
        style={{
          padding: "0 64px 64px 64px"
        }}
      >
        <Profile path="/profile" />
        <AnnouncementDetail path="/announcements/:id" />
        <AnnouncementForm path="/announcements" />
        <Home path="/" />
      </Router>
    </Layout>
  );
};

export default AuthenticatedApp;
