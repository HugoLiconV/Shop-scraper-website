import * as Sentry from "@sentry/browser";
import { getUser } from "./auth-client";

async function bootstrapAppData() {
  const res = await getUser();
  if (!res) {
    return { user: null };
  }
  Sentry.configureScope(function(scope) {
    scope.setUser({email: res.data.email})
  })
  
  return {
    user: res.data
  };
}

export { bootstrapAppData };
