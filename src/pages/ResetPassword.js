import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Typography, Form, Input, Icon, Button, message } from "antd";
import { navigate } from "@reach/router";
import { useAsync } from "react-async";
import ErrorMessage from "../components/ErrorMessage";
import { resetPassword } from "../services/auth-client";
import "./Login.css";

const { Title } = Typography;

const ResetPassword = ({ token, form }) => {
  const { isPending, error, run } = useAsync({
    deferFn: resetPassword,
    onResolve: onSuccess
  });
  
  function onSuccess() {
    message.success("Tu contraseña se cambió con éxito.");
    navigate("/login");
  }
  
  const { getFieldDecorator } = form;
  
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields(async (err, { password }) => {
    console.log("TCL: handleSubmit -> validateFields")
      if (!err) {
        run({ token, password });
      }
    });
  }

  return (
    <ErrorBoundary>
      <div className="page">
        <div className="container">
          <Title style={{ textAlign: "center" }} level={3}>
            Cambiar contraseña
          </Title>
          <Form onSubmit={handleSubmit} className="login-form">
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
              <Button
                block
                loading={isPending}
                disabled={isPending}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Cambiar contraseña
              </Button>
            </Form.Item>
            <ErrorMessage error={error} />
          </Form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Form.create({ name: "ResetPassword" })(ResetPassword);
