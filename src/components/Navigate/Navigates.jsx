import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Login/PrivateRoute";
import Login from "../Login/Login";
import { CommonRoutes, getUserRoutes } from "./UserRoleRoutes";
import ErrorPage from "../Pages/ErrorPage";
import { ConfigProvider } from "antd";
import "../../style/tableStyle.scss";

const Navigates = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          components: {
            Drawer: {
              footerPaddingBlock: 0,
              footerPaddingInline: 0,
              padding: 2,
              paddingLG: 2,
            },
          },
          Button: {
            colorPrimary: "#1890ff",
            defaultBg: "#a0d911",
            color: "black",
          },
          Table: {
            // headerBg: "rgb(99, 177, 177)",
            borderColor: "#e6f4ff",
            // rowHoverBg: "#B2CC3A",
            cellPaddingBlock: 12,
          },
          Tabs: {
            inkBarColor: "yellow",
            itemSelectedColor: "",
            cardBg: "#D9DFE3",
          },

          Segmented: {
            colorBgLayout: "#F4D03F",
            itemSelectedBg: "#D4AC0D",
          },
          Sider: {
            width: 600,
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home/dashboard"></Navigate>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<PrivateRoute></PrivateRoute>}>
            {CommonRoutes()}
            {getUserRoutes()}
          </Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default Navigates;
