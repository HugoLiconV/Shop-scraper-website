import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import CardContainer from "../components/CardContainer";
import { Typography, Form, Input, Button, Row, Col, message } from "antd";
import { useAsync } from "react-async";
import { me, updateUser, updatePassword } from "../services/userClient";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import HCenter from "../components/Layouts/HCenter";

const Profile = ({ form }) => {
  const {
    isPending: isProfilePending,
    data: user,
    error: profileError,
    isRejected: isProfileRejected
  } = useAsync({
    promiseFn: me
  });
  const {
    isPending: isUpdateProfilePending,
    error: updateProfileError,
    run: runUpdateProfile
  } = useAsync({
    deferFn: updateUser,
    onResolve: () => message.success("Perfil actualizado con éxito")
  });
    const {
      isPending: isUpdatePasswordPending,
      error: updatePasswordError,
      run: runUpdatePassword
    } = useAsync({
      deferFn: updatePassword
    });

  const name = (user && user.name) || "";
  const email = (user && user.email) || "";

  const { getFieldDecorator } = form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields(async (err, { currentPassword, newPassword, ...values }) => {
      if (!err) {
        if (currentPassword && newPassword) {
          runUpdatePassword({
            currentPassword,
            newPassword,
            id: user.id,
            email
          });
        }
        runUpdateProfile({...user, ...values});
      }
    });
  }

  function handleConfirmBlur (e) {
    const { value } = e.target;
    setConfirmDirty(!!value)
  };

  if (isProfileRejected) {
    return <ErrorMessage error={profileError} />;
  }

  return (
    <ErrorBoundary>
      <Row gutter={20}>
        <Col sm={24} lg={{ span: 10, offset: 7 }}>
          <CardContainer>
            <Typography.Title level={2}>Perfil</Typography.Title>
            {isProfilePending ? (
              <Loading title="Cargando usuario" />
            ) : (
              <Form onSubmit={handleSubmit}>
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
                  })(<Input />)}
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
                <Form.Item label="Contraseña actual">
                  {getFieldDecorator("currentPassword", {
                    rules: [
                      {
                        required: confirmDirty,
                        message: "Por favor introduce tu contraseña actual"
                      },
                      {
                        min: 6,
                        message:
                          "La contraseña debe de tener más de 6 caracteres"
                      }
                    ]
                  })(<Input.Password onBlur={handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="Nueva contraseña">
                  {getFieldDecorator("newPassword", {
                    rules: [
                      {
                        required: confirmDirty,
                        message: "Por favor introduce tu nueva contraseña"
                      },
                      {
                        min: 6,
                        message:
                          "La contraseña debe de tener más de 6 caracteres"
                      }
                    ]
                  })(<Input.Password onBlur={handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item>
                  <HCenter>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        isUpdateProfilePending || isUpdatePasswordPending
                      }
                      loading={
                        isUpdateProfilePending || isUpdatePasswordPending
                      }
                    >
                      Actualizar
                    </Button>
                  </HCenter>
                </Form.Item>
                <ErrorMessage
                  error={updateProfileError || updatePasswordError}
                />
              </Form>
            )}
          </CardContainer>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default Form.create({ name: "ProfileForm" })(Profile);
