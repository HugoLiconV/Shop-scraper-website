import React from "react";
import "./BuyMeACoffeeButton.css";

const BuyMeACoffeButton = () => {
  return (
    <a
      className="bmc-button"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/kUWTcjs"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span style={{ marginLeft: 15, fontSize: 19 }}>Buy me a coffee</span>
    </a>
  );
};

export default BuyMeACoffeButton;
