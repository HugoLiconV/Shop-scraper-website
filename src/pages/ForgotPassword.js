import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Typography, Form, Icon, Input, Button, Result } from "antd";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "@reach/router";
import HCenter from "../components/Layouts/HCenter";
import { useAsync } from "react-async";
import { createTokenToResetPassword } from "../services/auth-client";
import "./Login.css";

const { Title } = Typography;

const ForgotPassword = ({ form }) => {
  const [success, setSuccess] = useState(false)
  const {isPending, error, run} = useAsync({
    deferFn: createTokenToResetPassword,
    onResolve: onSuccess 
  });

  function onSuccess() {
    setSuccess(true)
  }

  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields(async (err, { email }) => {
      if (!err) {
        run({email})
      }
    });
  }

  return (
    <ErrorBoundary>
      <div className="page">
        <div className="container">
          <Title style={{ textAlign: "center" }} level={3}>
            Restaurar contraseña
          </Title>
          {success ? (
            <Result
              icon={<Icon type="smile" theme="twoTone" />}
              title="Un correo ha sido enviado a tu cuenta para restablecer tu contraseña"
              extra={<Link to="/login">Ir a inicio de sesión</Link>}
            />
          ) : (
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item label="Introduce tu correo">
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
                <Button
                  block
                  loading={isPending}
                  disabled={isPending}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Restaurar contraseña
                </Button>
              </Form.Item>
              <HCenter>
                <Button
                  type="link"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Volver
                </Button>
              </HCenter>
              <ErrorMessage error={error} />
            </Form>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Form.create({ name: "ForgotPassword" })(ForgotPassword);
