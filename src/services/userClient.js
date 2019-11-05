import client from "./api-client";

export async function me() {
  const res = await client("users/me").catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}

export async function updateUser(values) {
  console.log("TCL: updateUser -> values", values)
  const {id, ...data} = values && values[0];
  const res = await client(`users/${id}`, {
    method: "put",
    data
  }).catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}

export async function updatePassword(values) {
  const { id, email, currentPassword, newPassword } = values && values[0];
  const basicAuth = `Basic ${btoa(email + ":" + currentPassword)}`;
  const res = await client(`/users/${id}/password`, {
    method: "put",
    data: {
      password: newPassword
    },
    options: {
      headers: { Authorization: basicAuth }
    }
  }).catch(e => {
  if(e.response.status === 401) {
    return Promise.reject({message: "Contraseña incorrecta o email incorrecto"})
  }
    return Promise.reject(e)
  })

  return res.data;
}
