import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import CardContainer from "../components/CardContainer";
import { Typography, Row, Col, message } from "antd";
import { useAsync } from "react-async";
import { me, updateUser, updatePassword } from "../services/userClient";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";

const Profile = () => {
  const {
    isPending: isProfilePending,
    data: user,
    error: profileError,
    isRejected: isProfileRejected,
    reload: refetchProfile
  } = useAsync({
    promiseFn: me
  });
  const {
    isPending: isUpdateProfilePending,
    error: updateProfileError,
    run: runUpdateProfile
  } = useAsync({
    deferFn: updateUser,
    onResolve: () => {
      message.success("Perfil actualizado con éxito");
      refetchProfile();
    }
  });
  const {
    isPending: isUpdatePasswordPending,
    error: updatePasswordError,
    run: runUpdatePassword
  } = useAsync({
    deferFn: updatePassword,
    onResolve: () => message.success("Tu contraseña se actualizó con éxito.")
  });

  function handleUpdateUser(profile) {
    console.log("TCL: handleUpdateUser -> profile", profile);
    runUpdateProfile(profile);
  }

  function handleUpdatePassword(values) {
    runUpdatePassword({
      ...values,
      id: user.id,
      email: user.email
    });
  }

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
              <>
                <ProfileForm
                  user={user}
                  loading={isUpdateProfilePending}
                  onUpdateProfile={handleUpdateUser}
                />
                <PasswordForm
                  loading={isUpdatePasswordPending}
                  onUpdatePassword={handleUpdatePassword}
                />
                <ErrorMessage
                  error={updateProfileError || updatePasswordError}
                />
              </>
            )}
          </CardContainer>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default Profile;
