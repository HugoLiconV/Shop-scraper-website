import { getUser } from "./auth-client";

async function bootstrapAppData() {
  const res = await getUser();
  if (!res) {
    return { user: null };
  }
  return {
    user: res.data
  };
}

export { bootstrapAppData };
