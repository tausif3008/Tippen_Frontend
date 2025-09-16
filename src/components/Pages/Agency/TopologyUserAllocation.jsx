import React, { useEffect } from "react";
import {
  Button,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  agencyTopologyUserList,
  allocateTopologyFilesToUserAction,
  allocateToUserTopologyAction,
  downloadExcelFile,
  getBarcodeFromImage,
  TopologyPaginationAgencyAction,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import {
  canShowStaticTableColumn,
  downloadCSVFronBackend,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import {
  DownloadOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import { API_CONSTANTS } from "../../../globals/ApiConstants";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import JustButtonToRight from "../../CommonComponents/JustButtonToRight";

const ViewImage = ({ imageUrl }) => {
  return (
    <div className="barcode-reader-main-container">
      <div className="barcode-reader-image">
        <img src={imageUrl.image} alt="" />
      </div>
      <div></div>
    </div>
  );
};

const TopologyUserAllocation = ({ departmentId }) => {
  const { onShowSizeChange } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [viewImageUrl, setViewImage] = useState();
  const dispatch = useDispatch();
  const rectificationDetails = [
    {
      title: "Barcode Number",
      dataIndex: "barcode_number",
      width: 200,
    },
    {
      title: "District",
      dataIndex: "district",
    },
    {
      title: "Taluka",
      dataIndex: "taluka",
    },
    {
      title: "Village",
      dataIndex: "village",
    },
    {
      title: "Map Code",
      dataIndex: "map_code",
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
    {
      title: "View Image",
      dataIndex: "view_image",
      fixed: canShowStaticTableColumn() ? "right" : "",
      width: 200,
    },
    {
      title: "Topology Upload",
      dataIndex: "toplogy_upload",
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectedUser, setselectedUser] = useState(null);
  const [selectUser, setselectUser] = useState([]);
  const [useUrl, setuseUrl] = useState(
    URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL
  );

  const handleUser = (value) => {
    setselectedUser(value);
  };
  const selector = useSelector((state) => state.topologyAgencyList);
  const userSelector = useSelector((state) => state.topologyAgencyUsersList);

  useEffect(() => {
    if (!selector && !userSelector) {
      const userListUrl = URLS.DEPARTMENT_WISE_USER_LIST_URL + departmentId;
      dispatch(agencyTopologyUserList({ URL: userListUrl }));
      dispatch(
        allocateToUserTopologyAction({
          URL: URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (selector) {
      let tableDetailsArray = [];
      let res = selector.results;
      tableDetailsArray = [];

      for (let index = 0; index < res.length; index++) {
        tableDetailsArray.push({
          ...res[index],
          key: res[index]["id"],
          district:
            res[index].district_name && res[index].district_name.district_name,
          taluka: res[index].taluka_name && res[index].taluka_name.taluka_name,
          village:
            res[index].village_name && res[index].village_name.village_name,
          view_image: (
            <Button
              type="primary"
              className="download-button"
              onClick={() => {
                setViewImage({
                  id: res[index].id,
                  image: res[index].rectify_upload,
                  barcode_number: res[index].barcode_number,
                });
                setOpen(true);
              }}
            >
              <span>
                <EyeOutlined /> View Image
              </span>{" "}
            </Button>
          ),
        });
      }

      settableData(tableDetailsArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  useEffect(() => {
    let agencies = [];
    if (userSelector) {
      let list = userSelector["data1"];
      for (let index = 0; index < list.length; index++) {
        agencies.push({
          value: list[index]["id"],
          label: list[index]["username"],
        });
      }
      setselectUser(agencies);
    }
  }, [userSelector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  let columns = rectificationDetails;

  const start = () => {
    setLoadingSelected(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingSelected(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function handleCloseModal() {
    setOpen(false);
    setViewImage(null);
  }

  const hasSelected = selectedRowKeys.length > 0;

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `?page=${page}`;
    }
  }

  // function getPageDetails(url) {
  //   setSelectedRowKeys([]);
  //   let urlArray = url.split("/");
  //   const index1 = urlArray.indexOf("version_0") + 1;
  //   let nextUrlNew = urlArray.splice(index1, urlArray.length).join("/");
  //   dispatch(DigitizePaginationAgencyAction({ URL: nextUrlNew }));
  // }

  function getPageDetails(url) {
    setSelectedRowKeys([]);
    dispatch(TopologyPaginationAgencyAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(TopologyPaginationAgencyAction({ URL: url }));
  }

  function allocateTopologyFilesToUser() {
    if (selectedUser) {
      let url = URLS.ALLOCATE_TOPOLOGY_AGENCY_TO_USER + selectedUser + "/";
      dispatch(
        allocateTopologyFilesToUserAction({
          document_id: selectedRowKeys,
          URL: url,
        })
      );
    } else {
      message.info("Please select user to assign files.");
    }
  }

  const userAllocateion = useSelector(
    (state) => state.topologyAgencToUserMessage
  );

  useEffect(() => {
    if (userAllocateion) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(allocateToUserTopologyAction({ URL: useUrl }));
    }
  }, [userAllocateion]);

  const [form] = Form.useForm();

  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    // let baseUrl = URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL;
    let baseUrl = "version_0/document/govt-qc-pdf-complete-document-list/?";
    let url = getSearchingUrl(values, keys);

    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (canSearch) onFinish(canSearch);
  }, [canSearch]);
  const onReset = () => {
    form.resetFields();
  };

  function downloadExlsFiles() {
    dispatch(downloadExcelFile({ URL: useUrl + "&is_export=1" }));
  }

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);

  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
  };

  useEffect(() => {
    if (downloadExcelSelector) {
      downloadCSVFronBackend(downloadExcelSelector.csv_path);
      handleDownloadCompletion();
    }
  }, [downloadExcelSelector]);

  return (
    <>
      <Divider orientation="left">Not Found Files</Divider>
      <Modal
        width={1000}
        open={viewImageUrl && open}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
      >
        <ViewImage imageUrl={viewImageUrl}></ViewImage>
      </Modal>
      <div>
        <Collapse
          items={[
            {
              key: "1",
              label: <SearchOutlined></SearchOutlined>,
              children: (
                <Form
                  layout="inline"
                  form={form}
                  name="searchForm"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(v) => {
                    if (JSON.stringify(v) !== JSON.stringify(canSearch))
                      setCanSearch(v);
                  }}
                  autoComplete="off"
                  style={{ maxWidth: "100%" }}
                >
                  <Form.Item name="barcode_number">
                    <Input placeholder="Barcode Number" />
                  </Form.Item>

                  <Form.Item name="district_name">
                    <Input placeholder="District Names" />
                  </Form.Item>

                  <Form.Item name="district_code">
                    <Input placeholder="District Code" />
                  </Form.Item>

                  <Form.Item name="taluka_name">
                    <Input placeholder="Taluka Name" />
                  </Form.Item>

                  <Form.Item name="taluka_code">
                    <Input placeholder="Taluka Code" />
                  </Form.Item>

                  <Form.Item name="village_name">
                    <Input placeholder="Village Name" />
                  </Form.Item>

                  <Form.Item name="village_code">
                    <Input placeholder="Village Code" />
                  </Form.Item>

                  <Form.Item name="map_code">
                    <Input placeholder="Map Code" />
                  </Form.Item>

                  <Form.Item name="current_status">
                    <Input placeholder="Current Status" />
                  </Form.Item>
                  <Form.Item name="toplogy_upload">
                    <Input placeholder="Topology Upload" />
                  </Form.Item>

                  <Space>
                    <Form.Item>
                      <Button
                        type="dashed"
                        htmlType="submit"
                        className="search-button"
                      >
                        Search
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="clear-button"
                        type="primary"
                        onClick={() => {
                          onReset();
                        }}
                      >
                        Clear
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              ),
            },
          ]}
        />

        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

        <div className="flex flex-wrap  gap-2 align-content-center ">
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select User"
            style={{
              width: 300,
            }}
            onChange={handleUser}
            options={selectUser}
          />
          <span className="flex items-center">
            {hasSelected ? `Selected ${selectedRowKeys.length}` : ""}
          </span>
          <Button
            type="dashed"
            onClick={downloadExlsFiles}
            className="download-button ml-auto"
          >
            <span>
              <DownloadOutlined></DownloadOutlined> Excel
            </span>
          </Button>
        </div>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ ...setTableHeight(), x: 1000 }}
        />

        <Pagination
          onShowSizeChange={onShowSizeChange}
          showSizeChanger
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
          style={{ marginTop: "15px", display: "flex", alignContent: "end" }}
        />
        <div style={{ height: "20px" }}></div>
        <div className="allocation-button-container">
          <Button
            type="primary"
            onClick={allocateTopologyFilesToUser}
            disabled={selectedRowKeys.length === 0}
            className={`${
              selectedRowKeys.length === 0 ? "" : "download-button"
            } mb-2`}
          >
            Allocate selected files to user
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopologyUserAllocation;
