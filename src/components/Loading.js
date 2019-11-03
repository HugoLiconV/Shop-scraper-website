import React from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const Loading = ({ title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2>{title ? `${title}...` : "Cargando..."}</h2>
      <Icon type="loading" spin="true" style={{ fontSize: 32 }} />
    </div>
  );
};

Loading.propTypes = {
  title: PropTypes.string
};

export default Loading;



