import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        className="w-screen h-screen"
        src={require("../../images/404.png")}
        alt=""
      />
    </div>
  );
};

export default ErrorPage;
