import React, { useState } from "react";
import { Layout, Menu, Icon, Avatar, Dropdown, Drawer } from "antd";
import { useAuth } from "../context/auth-context";
import { Link, Location } from "@reach/router";
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

const Header = ({ user }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { logout } = useAuth();

  const dropDownMenu = (
    <Menu style={{ border: "none" }}>
      <Menu.Item>
        <NavLink to="/profile">
          <Icon type="smile" style={{ marginRight: 8 }} />
          <span>Perfil</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Icon type="logout" />
        <span>Cerrar Sesión</span>
      </Menu.Item>
    </Menu>
  );

  const renderLoginMenu = (location, mode = "horizontal") => (
    <Menu
      selectedKeys={[location.pathname]}
      mode={mode}
      style={{ border: "none" }}
    >
      <Menu.Item key="/login" style={{ border: "none" }}>
        <NavLink to="/login">Iniciar sesión</NavLink>
      </Menu.Item>
      <Menu.Item key="/create-account" style={{ border: "none" }}>
        <NavLink to="/create-account">Crear cuenta</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Location>
      {({ location }) => {
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
                size={40}
                src={require("../assets/img/discount.svg")}
                style={{ marginRight: 16 }}
              />
            </Link>
            <Menu
              selectedKeys={[location.pathname]}
              mode="horizontal"
              style={{ border: "none" }}
            >
              <Menu.Item key="/" style={{ border: "none" }}>
                <NavLink to="/">
                  <Icon type="home" theme="filled" style={{ fontSize: 24 }} />
                  <span className="hide-mobile">Inicio</span>
                </NavLink>
              </Menu.Item>
              {user && (
                <Menu.Item key="/products" style={{ border: "none" }}>
                  <NavLink to="/products">
                    <Icon
                      type="shopping"
                      theme="filled"
                      style={{ fontSize: 24 }}
                    />
                    <span className="hide-mobile">Tus productos</span>
                  </NavLink>
                </Menu.Item>
              )}
            </Menu>
            <div style={{ flex: 1 }} />
            <Icon
              type="menu"
              className="show-mobile"
              style={{ fontSize: 24 }}
              onClick={() => setShowDrawer(true)}
            />
            <Drawer
              className="menu_drawer"
              title={
                user ? (
                  <>
                    <Avatar
                      src={user && user.picture}
                      style={{ margin: "auto 10px" }}
                    />
                    {(user && user.name) || ""}
                  </>
                ) : (
                  "Pricer"
                )
              }
              placement="right"
              closable={false}
              onClose={() => setShowDrawer(false)}
              visible={showDrawer}
            >
              {user ? dropDownMenu : renderLoginMenu(location, "vertical")}
            </Drawer>
            <div className="hide-mobile">
              {user ? (
                <>
                  <Avatar
                    src={user && user.picture}
                    style={{ margin: "auto 10px" }}
                  />
                  <Dropdown overlay={dropDownMenu}>
                    <span
                      className="ant-dropdown-link"
                      style={{ fontSize: 18, cursor: "pointer" }}
                    >
                      {(user && user.name) || ""} <Icon type="down" />
                    </span>
                  </Dropdown>
                </>
              ) : (
                renderLoginMenu(location, "horizontal")
              )}
            </div>
          </Layout.Header>
        );
      }}
    </Location>
  );
};

export default Header;
