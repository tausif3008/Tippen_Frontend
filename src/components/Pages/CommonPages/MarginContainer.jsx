import React from "react";

const MarginContainer = ({
  marginTop = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
  marginRight = "0px",
}) => {
  return (
    <div
      style={{
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        display: "flex",
      }}
    ></div>
  );
};

export default MarginContainer;
