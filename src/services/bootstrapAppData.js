import { getUser } from "./auth-client";

async function bootstrapAppData() {
  console.log("TCL: bootstrapAppData -> bootstrapAppData")
  const res = await getUser();
  console.log("TCL: bootstrapAppData -> data", res);
  if (!res) {
    return { user: null };
  }
  return {
    user: res.data
  };
}

export { bootstrapAppData };
