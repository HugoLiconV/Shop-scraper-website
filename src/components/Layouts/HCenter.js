import React from "react";

const HCenter = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {props.children}
    </div>
  );
};

export default HCenter;
