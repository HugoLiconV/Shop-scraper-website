// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)import {jsx} from '@emotion/core'
import React, { useEffect } from "react";
import { useAsync } from "react-async";
import * as authClient from "../services/auth-client";
import { Icon } from "antd";
import { bootstrapAppData } from "../services/bootstrapAppData";

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
    return <Icon type="loading" spin={true} />;
  }
  if (isRejected) {
    return (
      <div css={{ color: "red" }}>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  const login = form => authClient.login(form).then(reload);
  const logout = () => authClient.logout().then(reload);
   
  return <AuthContext.Provider {...props} value={{ data, login, logout }} />;

}
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
export { AuthProvider, useAuth };
