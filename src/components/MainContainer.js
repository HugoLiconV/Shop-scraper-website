import React from "react";
import { Layout, Button } from "antd";
import Header from "./Header";
import { Link } from "@reach/router";
import * as Sentry from "@sentry/browser";
import SentryButton from "./SentryButton";

const MainContainer = props => {
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
      <Header user={props.user} />
      <div style={{ marginBottom: 50 }} className="page-padding">
        {props.children}
      </div>
      <Layout.Footer className="footer">
        <Link to="/about">Acerca de</Link>
        <SentryButton message="[user feedback]" title="Reportar problema" tags={['user feedback']}/>
      </Layout.Footer>
    </Layout>
  );
};

export default MainContainer;
