import React, { useState } from "react";
import { Button, Form, Input, Row, Col, Space, Card, Alert } from "antd";
import "./login.scss";
import {
  LockOutlined,
  UserOutlined,
  WarningOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { getUser } from "../../utils/sessionStorage";
import "../../images/META.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/Actions/BaseAction";
import LoginBg from "../../images/loginLeftImg.png";
import { AppImages } from "../../globals/AppImages";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  const [canShowAlert, setCanShowAlert] = useState(false);

  const onFinish = (values) => {
    const checkLogin = getUser();

    if (!canShowAlert) {
      if (checkLogin) window.location.href = "/";
      else dispatch(userLogin(values));
    }
  };

  let id = setInterval(() => {
    const checkLogin = getUser();
    if (checkLogin && !canShowAlert) {
      // setCanShowAlert(true);
      clearInterval(id);
      window.location.href = "/home/dashboard";
    } else if (!checkLogin && !canShowAlert) {
      setCanShowAlert(false);
    }
  }, 1);

  return (
    <div>
      {canShowAlert && (
        <Alert
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            textAlign: "center",
          }}
          message={
            <div>
              <WarningOutlined></WarningOutlined>
              <span style={{ marginLeft: "10px" }}>
                You signed in with another tab or window. Reload to refresh your
                session!
              </span>
            </div>
          }
          type="success"
        />
      )}

      <Row gutter={[0, 0]} style={{ height: "100vh" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mobile-hidden">
          <div
            style={{
              background: "#eaecf2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Space align="center">
              <img src={LoginBg} style={{ width: "100%", maxWidth: "480px" }} />
            </Space>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <div style={{}}>
            <div
              className="form-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Card
                size="large"
                style={{
                  maxWidth: "500px",
                  width: "450px",
                  boxShadow: "0px 0px 24px 5px rgba(221, 221, 221, 0.6)",
                  padding: "10px",
                }}
              >
                <Form
                  style={{
                    maxWidth: 450,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <img
                    src={AppImages.metaiImage}
                    alt=""
                    style={{
                      display: "flex",
                      margin: "auto",
                      width: "100%",
                      maxWidth: "230px",
                      marginBottom: "30px",
                    }}
                  />
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your username!",
                      },
                    ]}
                    style={{ marginTop: "15px" }}
                  >
                    <Input
                      autoComplete="off"
                      className="eems-ant-input-border"
                      prefix={<UserOutlined></UserOutlined>}
                      placeholder="User Name"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      autoComplete="off"
                      className="eems-ant-input-border"
                      prefix={<LockOutlined></LockOutlined>}
                      placeholder="Password"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="flex justify-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-orange-400 text-white "
                        loading={isLoading || canShowAlert}
                      >
                        {!isLoading && !canShowAlert && (
                          <>
                            <LoginOutlined className="text-sm" size={"small"} />{" "}
                            Login
                          </>
                        )}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
