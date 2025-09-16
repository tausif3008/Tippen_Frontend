import React, { useEffect } from "react";
import {
  Button,
  Collapse,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  paginationAction,
  allocateToRectifyAgency,
  agencyUserListAction,
  allocateFilesToUserAction,
  downloadExcelFile,
} from "../../../store/Actions/BaseAction";

import { URLS } from "../../../globals/urls";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  downloadCSVFronBackend,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const UserFileAllocation = ({ departmentId }) => {
  const { onShowSizeChange } = useOutletContext();
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
  ];

  const [tableData, settableData] = useState([]);
  const [nextUrl, setnextUrl] = useState([]);
  const [prevUrl, setprevUrl] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectedUser, setselectedUser] = useState(null);
  const [selectUser, setselectUser] = useState([]);
  const [useUrl, setuseUrl] = useState(URLS.GET_AlLLOCATE_TO_RECTIFY_URL);

  const handleUser = (value) => {
    setselectedUser(value);
  };

  const selector = useSelector((state) => state.agencyRectify);
  const userSelector = useSelector((state) => state.rectifyAgencyUsers);

  useEffect(() => {
    if (!selector && !userSelector) {
      const userListUrl = URLS.DEPARTMENT_WISE_USER_LIST_URL + departmentId;
      dispatch(agencyUserListAction({ URL: userListUrl }));
      dispatch(
        allocateToRectifyAgency({ URL: URLS.GET_AlLLOCATE_TO_RECTIFY_URL })
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
        });
      }

      settableData(tableDetailsArray);
      setnextUrl(selector.next);
      setprevUrl(selector.previous);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  useEffect(() => {
    let agencies = [];
    if (userSelector) {
      let list = userSelector["data"]["data1"];
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
  const [currentPageSize, setCurrentPageSize] = useState(20);

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

  const hasSelected = selectedRowKeys.length > 0;

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function getPageDetails(url) {
    dispatch(paginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(paginationAction({ URL: url }));
  }

  function allocateRectifyFilesToUser() {
    if (selectedUser) {
      let url = URLS.ALLCOATE_SCAN_UPLOAD_FILE_TO_USER + selectedUser + "/";
      dispatch(
        allocateFilesToUserAction({ document_id: selectedRowKeys, URL: url })
      );
    } else {
      message.info("Please select user to assign files.");
    }
  }

  const userAllocateion = useSelector((state) => state.userAllocation);
  useEffect(() => {
    if (userAllocateion) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(allocateToRectifyAgency({ URL: useUrl }));
    }
  }, [userAllocateion]);

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    let baseUrl = URLS.GET_AlLLOCATE_TO_RECTIFY_URL;
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
                <Form.Item name="file_name">
                  <Input placeholder="File Name" />
                </Form.Item>

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

      <div wrap className="flex flex-wrap gap-2">
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
        <div className="ml-auto">
          {" "}
          {hasSelected ? `Selected ${selectedRowKeys.length}` : ""}
        </div>
        <Button
          className="download-button"
          type="dashed"
          onClick={downloadExlsFiles}
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
        scroll={{ ...setTableHeight(), x: 1300 }}
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
        style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
      />
      <div style={{ height: "20px" }}></div>
      <div className="allocation-button-container">
        <Button
          type="primary"
          onClick={allocateRectifyFilesToUser}
          disabled={selectedRowKeys.length === 0 ? true : false}
          className={`${
            selectedRowKeys.length === 0 ? "" : "download-button"
          } mb-2`}
        >
          Allocate selected files to user
        </Button>
      </div>
    </div>
  );
};

export default UserFileAllocation;
