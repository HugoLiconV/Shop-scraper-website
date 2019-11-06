import client from "./api-client";

export async function searchProduct(values) {
  const params = (values && values[0]) || {};
  const res = await client(
    `/products/search?link=${encodeURIComponent(params.link)}&store=${
      params.store
    }`
  ).catch(error => {
    return Promise.reject(
      (error && error.response && error.response.data && error.response.data) ||
        error
    );
  });
  return res.data;
}

export async function getTrackedProducts({ limit, page, ...values }) {
  const params = (values && values[0]) || {};
  const res = await client(
    `/tracked-products?limit=${params.limit || limit}&page=${params.page || page}`
  ).catch(e => {
    return Promise.reject(e);
  });
  return res.data;
}

export async function getPurchasedProducts({ limit, page, ...values }) {
  const params = (values && values[0]) || {};
  const res = await client(
    `/tracked-products?wasPurchased=true&limit=${params.limit || limit}&page=${params.page || page}`
  ).catch(e => {
    return Promise.reject(e);
  });
  return res.data;
}

export async function removeProduct(values) {
  const id = values && values[0];
  const res = await client(`/tracked-products/${id}`, {
    method: "delete"
  });
  return res.data;
}

export async function updateProduct(values) {
  const [{ data, id }] = [values && values[0]];
  const res = await client(`/tracked-products/${id}`, {
    method: "put",
    data
  });
  return res;
}

export async function addProduct(values) {
  const data = (values && values[0]) || {};
  const res = await client(`/tracked-products`, {
    data,
    method: "post"
  }).catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}
