import React from "react";
import { useAsync } from "react-async";
import * as authClient from "../services/auth-client";
import { bootstrapAppData } from "../services/bootstrapAppData";
import Loading from "../components/Loading";
import { navigate } from "@reach/router";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const {
    data = { user: null },
    error,
    isPending,
    isRejected,
    reload
  } = useAsync({
    promiseFn: bootstrapAppData
  });

  if (isPending) {
    return <Loading title="Cargando usuario" />;
  }
  if (isRejected) {
    return (
      <div css={{ color: "red" }}>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  function handleSuccess(res) {
    navigate("/", { replace: true });
    return reload(res);
  }

  const login = form => authClient.login(form).then(handleSuccess);
  const logout = () => authClient.logout().then(handleSuccess);
  const createAccount = form =>
    authClient.createAccount(form).then(handleSuccess);
   
  return (
    <AuthContext.Provider
      {...props}
      value={{ data, login, logout, createAccount }}
    />
  );

}
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
export { AuthProvider, useAuth };
