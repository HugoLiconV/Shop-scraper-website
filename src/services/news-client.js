import client from "./api-client";

export async function getNews({limit, page, ...rest}) {
  const deferFnParams = (rest && rest[0]) || {}
  const res = await client(
    `/news?limit=${deferFnParams.limit || limit}&page=${deferFnParams.page || page}`
  ).catch(error => {
    return Promise.reject(error);
  });
  return res.data
}

export async function index({id}) {
  const res = await client(`/news/${id}`).catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}
