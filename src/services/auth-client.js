import client from "./api-client";
import { AUTH_TOKEN } from "../constants";
function handleUserResponse({data: { token, user}}) {
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

function logout() {
  window.localStorage.removeItem(AUTH_TOKEN);
  return Promise.resolve();
}

function getToken() {
  return window.localStorage.getItem(AUTH_TOKEN);
}

export { login, logout, getToken, getUser };
