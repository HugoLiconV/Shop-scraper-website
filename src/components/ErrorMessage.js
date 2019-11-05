import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorMessage = ({ error }) => {
  // console.log("TCL: ErrorMessage -> error", error)
  // console.log("TCL: ErrorMessage -> error", JSON.stringify(error, null, 2))
  if (!error || !error.message) return null;
  return (
    <ErrorStyles>
      <p>
        <strong>Oh oh</strong>
        {error.message}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
  error: {}
};

ErrorMessage.propTypes = {
  error: PropTypes.object
};

export default ErrorMessage;
