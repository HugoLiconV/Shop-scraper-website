import React from "react";
import { Form, Input, Button, Typography } from "antd";
import HCenter from "./Layouts/HCenter";

const ProfileForm = ({ form, user, onUpdateProfile, loading }) => {
  const { getFieldDecorator } = form;

  const name = (user && user.name) || "";
  const email = (user && user.email) || "";

  function handleUpdateUser(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onUpdateProfile({...user, ...values})
      }
    });
  }

  return (
    <Form onSubmit={handleUpdateUser}>
      <Typography.Title level={3}>Actualizar perfil</Typography.Title>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Introduce un correo válido"
            },
            {
              required: true,
              message: "Por favor introduce tu correo"
            }
          ],
          initialValue: email
        })(<Input type="email" />)}
      </Form.Item>
      <Form.Item label="Nombre">
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "Por favor introduce tu nombre"
            }
          ],
          initialValue: name
        })(<Input />)}
      </Form.Item>
      <Form.Item>
        <HCenter>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Actualizar perfil
          </Button>
        </HCenter>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "ProfileForm" })(ProfileForm);
