import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import AppProviders from "./context";
import dayjs from "dayjs";
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import "dayjs/locale/es"; // load on demand

dayjs.locale("es"); // use Spanish locale globally

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  release: process.env.REACT_APP_SENTRY_RELEASE
});
console.log("🚀 ~ file: index.js ~ line 20 ~ REACT_APP_SENTRY_RELEASE", {
  REACT_APP_SENTRY_RELEASE: process.env.REACT_APP_SENTRY_RELEASE
});

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
