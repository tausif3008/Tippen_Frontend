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
  DatePicker,
} from "antd";
import { useState } from "react";
import "../../../style/tableStyle.scss";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AssignQcFilesToUser,
  QCPaginationAgencyAction,
  allocateDigitizedFilesToUser,
  agencyQCUseList,
  downloadExcelFile,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import {
  downloadCSVFronBackend,
  getSearchingUrl,
  setTableHeight,
  getChangedDataPattern,
} from "../../../globals/healpers";
import moment from "moment";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import MarginContainer from "./../CommonPages/MarginContainer";

const { RangePicker } = DatePicker;

const QcFilesAssignUser = ({ departmentId }) => {
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
    { title: "Digitize Polygon", dataIndex: "polygon_count" },
    {
      title: "Digitize Agency",
      dataIndex: "digitize_agency_name",
    },
    {
      title: "Digitize User",
      dataIndex: "digitize_by_username",
      width: 170,
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed_date",
      width: 170,
      render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectedUser, setselectedUser] = useState(null);
  const [selectUser, setselectUser] = useState([]);

  const handleUser = (value) => {
    setselectedUser(value);
  };

  useEffect(() => {
    const userListUrl = URLS.DEPARTMENT_WISE_USER_LIST_URL + departmentId;
    dispatch(agencyQCUseList({ URL: userListUrl }));
    dispatch(AssignQcFilesToUser({ URL: URLS.GET_QC_DETAILS_URL }));
  }, []);

  const selector = useSelector((state) => state.qcFilesAgencyAdmin);
  const userSelector = useSelector((state) => state.qcAgencyUsersList);

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
  const [useUrl, setuseUrl] = useState(URLS.GET_QC_DETAILS_URL);

  let columns = rectificationDetails;

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
    setSelectedRowKeys([]);
    dispatch(QCPaginationAgencyAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(QCPaginationAgencyAction({ URL: url }));
  }

  function allocateQCFilesToUser() {
    if (selectedUser) {
      let url = URLS.ALLOCATE_QC_FILES_ADMIN_TO_USER + selectedUser + "/";
      dispatch(
        allocateDigitizedFilesToUser({
          document_id: selectedRowKeys,
          URL: url,
        })
      );
    } else {
      message.info("Please select user to assign files.");
    }
  }

  const userAllocateion = useSelector(
    (state) => state.qcFilesAgencyAdminMessage
  );

  useEffect(() => {
    if (userAllocateion) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(AssignQcFilesToUser({ URL: useUrl }));
    }
  }, [userAllocateion]);

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    if (values["digitize_end_date"]) {
      let start = values["digitize_end_date"][0];
      let end = values["digitize_end_date"][1];

      values["digitize_start_date"] = getChangedDataPattern(start);
      values["digitize_end_date"] = getChangedDataPattern(end);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.GET_QC_DETAILS_URL;
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
      if (downloadExcelSelector) {
        downloadCSVFronBackend(downloadExcelSelector.csv_path);
        handleDownloadCompletion();
      }
    }
  }, [downloadExcelSelector]);

  return (
    <div>
      <Collapse
        style={{ marginBottom: "10px" }}
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
                <Form.Item name="polygon_min">
                  <Input placeholder="Digtize Polygon MIN" />
                </Form.Item>

                <Form.Item name="polygon_max">
                  <Input placeholder="Digtize Polygon MAX" />
                </Form.Item>

                <Form.Item name="map_code">
                  <Input placeholder="Map Code" />
                </Form.Item>
                <Form.Item name="digitize_agency_name">
                  <Input placeholder="Digitize Agency Name" />
                </Form.Item>
                <Form.Item name="digitize_by_username">
                  <Input placeholder="Digitize User Name" />
                </Form.Item>
                <Form.Item name="digitize_end_date">
                  <RangePicker
                    placeholder={["Digitize Start Date", "Digitize End Date"]}
                  ></RangePicker>
                </Form.Item>
                <Form.Item name="current_status">
                  <Input placeholder="Current Status" />
                </Form.Item>
                <Space>
                  <Form.Item>
                    <Button
                      className="search-button"
                      type="dashed"
                      htmlType="submit"
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

      <div className="flex gap-2 flex-wrap">
        <Select
          optionFilterProp="label"
          style={{
            width: 270,
          }}
          showSearch
          placeholder="Select User"
          onChange={handleUser}
          options={selectUser}
        />

        <div className="ml-auto">
          {" "}
          {hasSelected ? `Selected ${selectedRowKeys.length}` : ""}
        </div>
        <Button
          type="dashed"
          onClick={downloadExlsFiles}
          className="download-button"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> Excel
          </span>
        </Button>
      </div>
      <MarginContainer marginBottom="10px"></MarginContainer>
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
        total={totalCount}
        showSizeChanger
        current={currentPage}
        showQuickJumpers
        pageSize={currentPageSize}
        defaultPageSize={currentPageSize}
        showTotal={(total) => `Total ${totalCount} items`}
        onChange={paginationPageChange}
        style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
      />
      <div style={{ height: "15px" }}></div>
      <div className="allocation-button-container">
        <Button
          type="primary"
          onClick={allocateQCFilesToUser}
          disabled={selectedRowKeys.length === 0}
          className={`${selectedRowKeys.length === 0 ? "" : "download-button"}`}
        >
          Allocate selected files to user
        </Button>
      </div>
    </div>
  );
};

export default QcFilesAssignUser;
