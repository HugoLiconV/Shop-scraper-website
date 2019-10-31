import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown, Typography } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useAuth } from "../context/auth-context";
import { Router, Link, Location } from "@reach/router";
import "./Header.css";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "#1890ff" : "rgba(0, 0, 0, 0.65)"
        }
      };
    }}
  />
);

const Header = props => {
  const {
    data: { user },
    logout
  } = useAuth();
  // const currentRoute = props.location.pathname;

  function handleMenuClick(e) {
    console.log("TCL: handleMenuClick -> e", e);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/profile">
          <Icon type="smile" style={{marginRight: 8}}/>
          <span>Perfil</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Icon type="logout" />
        <span>Cerrar Sesión</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Location>
      {({ location }) => {
      console.log("TCL: location", location)
        return (
          <Layout.Header
            className="header"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 16
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16
              }}
            >
              <Avatar
                shape="square"
                size={48}
                src={require("../assets/img/bison.svg")}
                style={{ marginRight: 16 }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center"
                }}
              >
                <Typography.Title
                  level={4}
                  style={{ lineHeight: 1, margin: 0 }}
                >
                  Noti
                </Typography.Title>
                <Typography.Title
                  level={4}
                  style={{ lineHeight: 1, margin: 0 }}
                >
                  Tec
                </Typography.Title>
              </div>
            </Link>
            <Menu
              onClick={handleMenuClick}
              selectedKeys={[location.pathname]}
              mode="horizontal"
              style={{ borderBottom: "none" }}
            >
              <Menu.Item key="/" style={{ borderBottom: "none" }}>
                <NavLink to="/">
                  <Icon type="read" />
                  Noticias
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/create-announcement"
                style={{ borderBottom: "none" }}
              >
                <NavLink to="/create-announcement">
                  <Icon type="plus" />
                  Añadir
                </NavLink>
              </Menu.Item>
            </Menu>
            <div style={{ flex: 1 }} />
            <Avatar
              src={user && user.picture}
              style={{ margin: "auto 10px" }}
            />
            <Dropdown overlay={menu}>
              <span
                className="ant-dropdown-link"
                style={{ fontSize: 18, cursor: "pointer" }}
              >
                {(user && user.name) || ""} <Icon type="down" />
              </span>
            </Dropdown>
          </Layout.Header>
        );
      }}
    </Location>
  );
};

export default Header;
