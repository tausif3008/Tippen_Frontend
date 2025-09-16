import React, { useEffect, useRef } from "react";
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
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  agencyListingAction,
  allocateToDigitizeySuper,
  digitizePaginationAction,
  digitizeSubmitToAgency,
  downloadExcelFile,
} from "../../../store/Actions/BaseAction";

import { URLS } from "../../../globals/urls";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getSearchingUrl,
  setTableHeight,
  getChangedDataPattern,
} from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const { RangePicker } = DatePicker;

const DigitizeFileAllocation = () => {
  const dispatch = useDispatch();
  const { onShowSizeChange, fetchDataaa } = useOutletContext();

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
      title: "Rectify Date",
      dataIndex: "rectify_completed_date",
      render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
    },
    {
      title: "Rectify Agency",
      dataIndex: "rectify_agency_name",
    },
    {
      title: "Rectify By",
      dataIndex: "rectify_by_username",
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectedAgencyID, setselectedAgencyID] = useState(null);
  const [selectAgency, setselectAgency] = useState([]);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };
  const selector = useSelector((state) => state.digitizeFiles);
  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));

    if (!selector)
      dispatch(
        allocateToDigitizeySuper({ URL: URLS.GET_ALLOCATE_TO_DIGITISE_URL })
      );
  }, []);

  useEffect(() => {
    if (selector && selector.results.length >= 0) {
      let tableDetailsArray = [];
      let res = selector.results;

      for (const element of res) {
        tableDetailsArray.push({
          ...element,
          key: element["id"],
          district:
            element.district_name && element.district_name.district_name,
          taluka: element.taluka_name && element.taluka_name.taluka_name,
          village: element.village_name && element.village_name.village_name,
        });
      }

      settableData(tableDetailsArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  useEffect(() => {
    let agencies = [];
    if (agencySelector) {
      for (let index = 0; index < agencySelector.length; index++) {
        agencies.push({
          value: agencySelector[index]["id"],
          label: agencySelector[index]["agency_name"],
        });
      }
      setselectAgency(agencies);
    }
  }, [agencySelector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [useUrl, setuseUrl] = useState(URLS.GET_ALLOCATE_TO_DIGITISE_URL);

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

  useEffect(() => {}, [rowSelection]);

  const hasSelected = selectedRowKeys.length > 0;

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function getPageDetails(url) {
    setSelectedRowKeys([]);
    dispatch(digitizePaginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(digitizePaginationAction({ URL: url }));
  }

  function allocateDigitizeFiles() {
    if (selectedAgencyID) {
      let url = URLS.ALLOCATE_TO_AGENCY_DIGITIZE + selectedAgencyID + "/";
      dispatch(
        digitizeSubmitToAgency({ document_id: selectedRowKeys, URL: url })
      );
    } else {
      message.info("Please select agency to assign");
    }
  }

  function DownlaodZipOfSelectedRectifyFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  const agencyAllocationResponse = useSelector(
    (state) => state.digitizeMessage
  );

  useEffect(() => {
    if (agencyAllocationResponse) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(allocateToDigitizeySuper({ URL: useUrl }));
    }
  }, [agencyAllocationResponse]);

  // seraching content
  const [form] = Form.useForm();

  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    if (values["rectify_end_date"]) {
      let start = values["rectify_end_date"][0];
      let end = values["rectify_end_date"][1];
      values["rectify_start_date"] = getChangedDataPattern(start);
      values["rectify_end_date"] = getChangedDataPattern(end);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.GET_ALLOCATE_TO_DIGITISE_URL;
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

  const lodingFromState = useSelector((state) => state.loading);

  function downloadExlsFiles() {
    dispatch(downloadExcelFile({ URL: useUrl + "&is_export=1" }));
  }

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);
  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
  };

  useEffect(() => {
    if (downloadExcelSelector) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.onload = handleDownloadCompletion();
      document.body.appendChild(iframe);
      iframe.src = URLS.BASE_URL_EXCEL + downloadExcelSelector.csv_path;
      return () => {
        document.body.removeChild(iframe);
      };
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
                  if (JSON.stringify(canSearch) !== JSON.stringify(v))
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

                <Form.Item name="rectify_agency_name">
                  <Input placeholder="Rectify Agency Name" />
                </Form.Item>

                <Form.Item name="rectify_by_username">
                  <Input placeholder="Rectify By Username" />
                </Form.Item>

                <Form.Item name="rectify_end_date">
                  <RangePicker
                    placeholder={["Rectify Start Date", "Rectify End Date"]}
                  ></RangePicker>
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

      <div className="flex flex-wrap gap-2 align-content-center">
        <Select
          optionFilterProp="label"
          showSearch
          defaultValue="Select Agency"
          style={{
            width: 300,
          }}
          onChange={handleAgency}
          options={selectAgency}
        />

        <div className="flex ml-auto">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </div>
        <Button
          className="download-button "
          onClick={() => fetchDataaa("File_Allocation_Digitize", useUrl)}
        >
          <span>
            <DownloadOutlined /> CSV
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
        scroll={{ ...setTableHeight(), x: 1600 }}
      />

      <Pagination
        showSizeChanger
        total={totalCount}
        current={currentPage}
        showQuickJumpers
        onShowSizeChange={onShowSizeChange}
        pageSize={currentPageSize}
        defaultPageSize={currentPageSize}
        showTotal={(total) => `Total ${totalCount}`}
        onChange={paginationPageChange}
        style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
      />

      <div style={{ height: "20px" }}></div>
      <div className="allocation-button-container flex flex-wrap gap-2">
        <Button
          className={`${selectedRowKeys.length !== 0 ? "download-button" : ""}`}
          type="primary"
          onClick={allocateDigitizeFiles}
          disabled={selectedRowKeys.length === 0}
        >
          Allocate Selected Files to Agency
        </Button>
        &nbsp;&nbsp;&nbsp;
        <a
          href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_RECTIFY_URL}document_ids=${selectedRowKeys}`}
          download={``}
        >
          <Button
            type="primary"
            className={`${
              selectedRowKeys.length !== 0 ? "download-button" : ""
            }`}
            onClick={DownlaodZipOfSelectedRectifyFiles}
            disabled={selectedRowKeys.length === 0}
          >
            Download Zip of Rectify Files
          </Button>
        </a>
      </div>
    </div>
  );
};

export default DigitizeFileAllocation;
