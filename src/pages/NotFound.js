import React from "react";
import { Result, Button } from "antd";
import { Link } from "@reach/router";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos. Esta página no existe."
      extra={
        <Link to="/" replace>
          <Button type="primary">Volver a inicio.</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
