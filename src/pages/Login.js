import React, { useState } from "react";
import { Typography, Avatar, message } from "antd";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "@reach/router";
import { useAuth } from "../context/auth-context";
import "./Login.css";
import ErrorMessage from "../components/ErrorMessage";
import HCenter from "../components/Layouts/HCenter";
import ErrorBoundary from "./ErrorBoundary";

const { Title } = Typography;

const Login = function({ form }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { login } = useAuth();
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields(async (err, { email, password }) => {
      if (!err) {
        setLoading(true);
        await login({
          email,
          password
        }).catch(e => {
          setLoading(false);
          if (e && e.response && e.response.status === 401) {
            message.error("Datos incorrectos. Vuelve a intentarlo");
          } else {
            message.error("Error en el servidor. Vuelve a intentarlo luego.");
            setError(e);
          }
        });
      }
    });
  }

  return (
    <ErrorBoundary>
      <div className="page">
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar
              size={96}
              src={require("../assets/img/discount.svg")}
              style={{ marginRight: 16 }}
            />
            <Title level={2}>Pricer</Title>
          </div>
          <Title style={{ textAlign: "center" }} level={3}>
            Iniciar sesión
          </Title>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Introduce un correo",
                    type: "email"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  autoComplete="username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Introduce una contraseña" },
                  {
                    min: 6,
                    message: "La contraseña debe de tener más de 6 caracteres"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                block
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar sesión
              </Button>
              {/* Load create account component only if needed */}
              <HCenter>
                <Link to="/create-account">Crear Cuenta</Link>
              </HCenter>
              <HCenter>
                <Link to="/forgot-password">Olvide contraseña</Link>
              </HCenter>
            </Form.Item>
            <ErrorMessage error={error} />
          </Form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Form.create({ name: "login" })(Login);
