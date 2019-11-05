import React, { useState } from "react";
import { Avatar, Typography, Form, Input, Icon, Button } from "antd";
import { Link } from "@reach/router";
import "./Login.css";
import ErrorMessage from "../components/ErrorMessage";
import HCenter from "../components/Layouts/HCenter";
import { useAuth } from "../context/auth-context";
import ErrorBoundary from "./ErrorBoundary";

const { Title } = Typography;

const CreateAccount = ({ form }) => {
  const { createAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields(async (err, { email, password, name }) => {
      if (!err) {
        setLoading(true);
        await createAccount({
          email,
          password,
          name
        }).catch(e => {
          setError(e.message);
        });
        setLoading(false);
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
                  placeholder="Contraseña"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Introduce tu nombre" }]
              })(<Input placeholder="Nombre" />)}
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
                Crear cuenta
              </Button>
              <HCenter>
                <Link to="/login">Iniciar sesión</Link>
              </HCenter>
            </Form.Item>
            <ErrorMessage error={error} />
          </Form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Form.create({ name: "login" })(CreateAccount);
