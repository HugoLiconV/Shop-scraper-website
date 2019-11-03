import React from "react";

const VCenter = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {props.children}
    </div>
  );
};

export default VCenter;
