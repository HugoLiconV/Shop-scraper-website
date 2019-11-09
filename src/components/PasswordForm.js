import React from "react";
import { Form, Input, Button, Typography } from "antd";
import HCenter from "./Layouts/HCenter";

const PasswordForm = ({ form, onUpdatePassword, loading }) => {
  const { getFieldDecorator } = form;

  function handleUpdatePassword(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onUpdatePassword(values);
      }
    });
  }

  return (
    <Form onSubmit={handleUpdatePassword}>
      <Typography.Title level={3}>Actualizar contraseña</Typography.Title>
      <Form.Item label="Contraseña actual">
        {getFieldDecorator("currentPassword", {
          rules: [
            {
              required: true,
              message: "Por favor introduce tu contraseña actual"
            },
            {
              min: 6,
              message: "La contraseña debe de tener más de 6 caracteres"
            }
          ]
        })(<Input.Password autoComplete="false" type="password" />)}
      </Form.Item>
      <Form.Item label="Nueva contraseña">
        {getFieldDecorator("newPassword", {
          rules: [
            {
              required: true,
              message: "Por favor introduce tu nueva contraseña"
            },
            {
              min: 6,
              message: "La contraseña debe de tener más de 6 caracteres"
            }
          ]
        })(<Input.Password autoComplete="false" type="password" />)}
      </Form.Item>
      <Form.Item>
        <HCenter>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Actualizar contraseña
          </Button>
        </HCenter>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "PasswordForm" })(PasswordForm);
