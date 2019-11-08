import client from "./api-client";
import { AUTH_TOKEN } from "../constants";

function handleUserResponse({ data: { token, user } }) {
  window.localStorage.setItem(AUTH_TOKEN, token);
  return user;
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client("/users/me").catch(error => {
    logout();
    return Promise.reject(error);
  });
}

function login({ email, password }) {
  const basicAuth = `Basic ${btoa(email + ":" + password)}`;
  return client("/auth", {
    method: "post",
    data: {
      access_token: process.env.REACT_APP_MASTER_KEY
    },
    options: {
      headers: { Authorization: basicAuth }
    }
  }).then(handleUserResponse);
}

function createAccount({ email, password, name }) {
  return client("/users", {
    method: "post",
    data: {
      access_token: process.env.REACT_APP_MASTER_KEY,
      email,
      password,
      name
    }
  }).then(handleUserResponse);
}

async function createTokenToResetPassword(values) {
  const { email } = (values && values[0]) || {};
  const res = await client("/password-resets", {
    method: "post",
    data: {
      access_token: process.env.REACT_APP_MASTER_KEY,
      link: `${window.location.hostname}/reset-password`,
      email
    }
  }).catch(error => {
    if (error.response.status === 404) {
      return Promise.reject({
        message: "Usuario no encontrado"
      });
    }
    return Promise.reject({
      message: "Error. Vuelve a intentarlo luego."
    });
  });
  return res;
}

async function resetPassword(values) {
  const { token, password } = (values && values[0]) || {};
  const res = await client(`/password-resets/${token}`, {
    method: "put",
    data: {
      password
    }
  }).catch(() => {
    return Promise.reject({
      message: "Al parecer el link expiró. Pero puedes volver a generar otro"
    });
  });
  return res;
}

function logout() {
  window.localStorage.removeItem(AUTH_TOKEN);
  return Promise.resolve();
}

function getToken() {
  return window.localStorage.getItem(AUTH_TOKEN);
}

export {
  login,
  logout,
  getToken,
  getUser,
  createAccount,
  createTokenToResetPassword,
  resetPassword
};
