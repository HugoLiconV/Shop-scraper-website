import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import { Link } from "@reach/router";

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
      <div style={{marginBottom: 50}}>{props.children}</div>
      <Layout.Footer className="footer">
        <Link to="/about">Acerca de</Link>
      </Layout.Footer>
    </Layout>
  );
};

export default MainContainer;
