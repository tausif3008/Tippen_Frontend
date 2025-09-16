import React from "react";
import { getUser } from "../../utils/sessionStorage";
import { Navigate } from "react-router-dom";
import { NewAppLayout } from "../AppLayout/NewAppLayout";

const PrivateRoute = () => {
  let auth = getUser();
  return auth ? (
    <NewAppLayout></NewAppLayout>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
};

export default PrivateRoute;
