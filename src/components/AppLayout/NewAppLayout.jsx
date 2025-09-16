import React, { Suspense, useEffect, useMemo, useState, lazy } from "react";
import "../../index.css";
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Drawer,
  Layout,
  Menu,
  Button,
  theme,
  Space,
  message,
  Spin,
  Progress,
  Popover,
  Badge,
  Empty,
} from "antd";
import "./NewAppLayout.scss";
import "../../images/META.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, getUserId, getUserRole } from "../../utils/sessionStorage";
import { getUserLinks } from "../../globals/userDashboardDetails";
import { URLS } from "../../globals/urls";
import { changePaginationSize } from "../../store/Actions/BaseAction";
import { useDispatch, useSelector } from "react-redux";
import { AppImages } from "../../globals/AppImages";
import GetAllDocumentsData from "../Pages/CommonPages/GetAllDocumentsData";
import fetchData from "../Pages/CommonPages/FetchData";
import DownloadCSV from "../Pages/CommonPages/DownloadCSV";
import MarginContainer from "./../Pages/CommonPages/MarginContainer";
import { getAllDocumentsDownloadingResult } from "../../utils/downloadPDFAndExcel";
import { postHTTP } from "../../Axios/Axios";

export const NewAppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUrl = location.pathname.split("/")[2];

  useEffect(() => {
    if (currentUrl) {
      setOpen(false);
      // dispatch(setLoadingFalse())
    }
  }, [currentUrl]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        getUserRole() !== "Super Admin"
      ) {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [wantToLogOut, setWantToLogOut] = useState(false);

  useEffect(() => {
    if (wantToLogOut) {
      window.location.href = "/login";
    }
  }, [wantToLogOut]);

  const logout = () => {
    postHTTP(URLS.USER_LOGOUT);

    localStorage.clear();
    setWantToLogOut(true);
    localStorage.setItem("login", false);
  };

  const keys = ["dashboard"];
  const labels = ["Dashboard"];
  const icons = [DashboardOutlined];

  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  function assignFunctionalityAccordingToRoll() {
    getUserLinks().forEach((element) => {
      keys.push(element.key);
      labels.push(element.labels);
      icons.push(element.icon);
    });
  }

  assignFunctionalityAccordingToRoll();

  let items = icons.map((icon, index) => ({
    key: keys[index],
    icon: React.createElement(icon),
    label: labels[index],
  }));

  message.config({
    duration: 5,
  });

  function onShowSizeChange(current, page_size) {
    const userId = getUserId();
    const url = URLS.CHANGE_PAGINATION_SIZE_URL + userId + "/";
    const payload = { page_size };
    dispatch(changePaginationSize({ URL: url, payload }));
  }

  const handleNavigateTo = (key) => {
    const PaginationPages = ["allDocumentList"];
    const includes = PaginationPages.includes(key.key);
    if (!includes) navigate(`/home/${key.key}`);
    else navigate(`/home/${key.key}/page=/1`);
  };

  const [canProcess, setCanProcess] = useState(false);

  function downloadExcel() {
    setCanProcess(true);
  }

  const loadingSelector = useSelector((state) => state.loading);
  const [canDownload, setCanDownload] = useState(false);
  const [page, setPage] = useState(0);

  const [process, setProcess] = useState({});
  const [fileName, setfileName] = useState([]);

  async function fetchDataaa(fileNamess, url) {
    const occurrencesOf100 = Object.values(process).filter(
      (item) => item !== 100
    );

    if (occurrencesOf100.length < 3) {
      setfileName((fileNames) => [...fileNames, fileNamess]);
      let process = `process${page}`;
      setProcess((state) => ({ ...state, [process]: 0 }));
      setPage((page) => page + 1);

      let response = await fetchData(url, process, setProcess, process);
      const csvData = getAllDocumentsDownloadingResult(response);

      DownloadCSV(csvData, fileNamess);
    } else {
      message.info(
        "You are limited to downloading a maximum of three files concurrently!"
      );
    }
  }

  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };

  //Drawer
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const updateWindowDimensions = () => {
    if (window.innerWidth >= 1280) {
      setOpen(false);
    }

    if (!collapsed && window.innerWidth < 1280) {
      setCollapsed((s) => false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event?.key === "login" || event?.key === "refresh") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Spin
      spinning={loadingSelector}
      indicator={
        <img
          style={{
            width: "100px",
            height: "100px",
            marginLeft: "-50px",
          }}
          src={AppImages.spinner}
          alt="loading"
        ></img>
      }
    >
      <Layout>
        <div className="hidden  xl:block hidden_container">
          <Sider trigger={null} collapsible collapsed={collapsed} width={278}>
            <Space direction="vertical ">
              <div
                style={{ padding: "6%" }}
                className="eems-metamind-image-contaiener"
              >
                <Link to={"/home/dashboard"}>
                  <div
                    style={{
                      background: "white",
                      width: "100%",
                      padding: "6% 8%",
                      borderRadius: "7px",
                    }}
                  >
                    <img
                      className="metamind-img"
                      style={{ width: "100%" }}
                      src={require("../../images/META.png")}
                      alt=""
                    />
                  </div>
                </Link>
              </div>
              <Menu
                style={{
                  overflowY: "auto",
                  height: "85vh",
                }}
                theme="dark"
                mode="inline"
                selectedKeys={[currentUrl]}
                items={items}
                onClick={handleNavigateTo}
              />
            </Space>
          </Sider>
        </div>

        <Drawer
          closeIcon={<CloseOutlined />}
          width="290px"
          title={
            <div>
              <Link to={"/home/dashboard"}>
                <img
                  className="w-5/6"
                  src={require("../../images/META.png")}
                  alt=""
                />
              </Link>
            </div>
          }
          placement={placement}
          closable={true}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <Sider width={270} trigger={null} collapsible collapsed={collapsed}>
            <Menu
              style={{
                overflowY: "auto",
                marginTop: "10px",
              }}
              theme="dark"
              mode="inline"
              selectedKeys={[currentUrl]}
              items={items}
              onClick={handleNavigateTo}
            />
          </Sider>
        </Drawer>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#d6e4ff",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
              className="hidden xl:block"
            />
            <MenuOutlined onClick={showDrawer} className="xl:hidden ml-6" />
            <div className="header-content">
              <div>
                <Badge count={fileName.length} offset={[0, -7]}>
                  <div>
                    <Popover
                      placement="bottomRight"
                      title={"Downloading's"}
                      content={
                        <div>
                          {Object.keys(process).length !== 0 ? (
                            Object.keys(process).map((el, index) => {
                              return (
                                <>
                                  <p>{fileName[index]}</p>
                                  <Progress
                                    key={index}
                                    percent={process[el]}
                                    strokeColor={twoColors}
                                  />
                                </>
                              );
                            })
                          ) : (
                            <Empty description="No Downloading's" />
                          )}
                        </div>
                      }
                      arrow={mergedArrow}
                    >
                      <span>
                        CSV <DownloadOutlined></DownloadOutlined>
                      </span>
                      {"    "}
                    </Popover>{" "}
                  </div>
                </Badge>
              </div>
              <MarginContainer marginRight="15px"></MarginContainer>
              <Space
                style={{
                  background: "#e8f7ff",
                  fontSize: "15px",
                  padding: "0 15px",
                }}
              >
                <div className="username-container">
                  {" "}
                  Hi, {getUser()?.username}
                </div>
                <Button
                  type="text"
                  className="eems-logout-btn"
                  onClick={logout}
                >
                  <Space>
                    <LogoutOutlined style={{ color: "red" }}></LogoutOutlined>
                  </Space>
                </Button>
              </Space>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="appLayout">
              <div className="content_container h-fit">
                {canDownload && (
                  <GetAllDocumentsData
                    canDownload={setCanDownload}
                    url="version_0/document/all-document-list/?barcode_number=&district_name=&district_code=&taluka_name=Kagal&taluka_code=&village_name=&village_code=&map_code=&current_status=&scan_by_username=&scan_end_date=&rectify_agency_name=&rectify_by_username=&digitize_agency_name=&digitize_by_username=&digitize_end_date=&qc_by_username=&qc_end_date=&polygon_count=&bel_scan_uploaded=&bel_gov_scan_qc_approved=&bel_draft_uploaded=&bel_gov_draft_qc_approved=&"
                  ></GetAllDocumentsData>
                )}

                <Suspense fallback={<div>Content is loading...</div>}>
                  <Outlet
                    context={{
                      onShowSizeChange,
                      dispatch,
                      downloadExcel,
                      fetchDataaa,
                    }}
                  ></Outlet>
                </Suspense>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};
