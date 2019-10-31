import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div
      style={{
        margin: "20px auto",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        boxShadow: "rgba(118, 143, 255, 0.1) 0px 16px 24px 0px"
      }}
    >
      {children}
    </div>
  );
};

export default CardContainer;
