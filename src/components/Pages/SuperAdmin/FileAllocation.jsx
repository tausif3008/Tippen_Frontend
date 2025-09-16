import React, { useEffect, useMemo } from "react";
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
  Checkbox,
  DatePicker,
} from "antd";
import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  agencyListingAction,
  allocateToRectifyPut,
  allocateToRectifySuper,
  paginationAction,
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
import MarginContainer from "../CommonPages/MarginContainer";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
const { RangePicker } = DatePicker;

const FileAllocation = () => {
  const { onShowSizeChange, fetchDataaa } = useOutletContext();
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
      title: "Scan Uploaded Date",
      dataIndex: "scan_uploaded_date",
      render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
    },
    {
      title: "Scan By",
      dataIndex: "scan_by_username",
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
  const [checkDigitize, setcheckDigitize] = useState(false);
  const [checkQC, setcheckQC] = useState(false);

  const [useUrl, setuseUrl] = useState(URLS.GET_AlLLOCATE_TO_RECTIFY_URL);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };

  const selector = useSelector((state) => state.agencyRectify);
  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));
    if (!selector)
      dispatch(
        allocateToRectifySuper({ URL: URLS.GET_AlLLOCATE_TO_RECTIFY_URL })
      );
  }, []);

  useEffect(() => {
    if (selector && selector.results.length >= 0) {
      let tableDetailsArray = [];
      let res = selector.results;

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
    dispatch(paginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(paginationAction({ URL: url }));
  }

  function allocateRectifyFiles() {
    if (selectedAgencyID) {
      let url = URLS.ASSIGN_RECTIFY_FILES_URL + selectedAgencyID + "/rectify/";
      if (checkDigitize) {
        url = URLS.ASSIGN_RECTIFY_FILES_URL + selectedAgencyID + "/digitize/";
      }
      if (checkQC) {
        url = URLS.ASSIGN_RECTIFY_FILES_URL + selectedAgencyID + "/qc/";
      }
      dispatch(
        allocateToRectifyPut({ document_id: selectedRowKeys, URL: url })
      );
    } else {
      message.info("Please select agency to assign");
    }
  }

  function DownlaodZipOfSelectedScanFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  const rectifyAllocationResponse = useSelector(
    (state) => state.rectifyResponse
  );

  useEffect(() => {
    if (rectifyAllocationResponse) {
      setcurrentPage(1);
      setSelectedRowKeys([]);
      dispatch(allocateToRectifySuper({ URL: useUrl }));
    }
  }, [rectifyAllocationResponse]);

  const [form] = Form.useForm();

  const [searchParametersChanged, setSearchParametersChanged] = useState();

  const onFinish = (values) => {
    if (values["scan_end_date"]) {
      let start = values["scan_end_date"][0];
      let end = values["scan_end_date"][1];

      values["scan_start_date"] = getChangedDataPattern(start);
      values["scan_end_date"] = getChangedDataPattern(end);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.GET_AlLLOCATE_TO_RECTIFY_URL;
    let url = getSearchingUrl(values, keys);
    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (searchParametersChanged) onFinish(searchParametersChanged);
  }, [searchParametersChanged]);

  const onReset = () => {
    form.resetFields();
  };

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);

  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
  };

  const handleAllocationToDigitize = (e) => {
    setcheckDigitize(e.target.checked);
  };

  const handleAllocationToQC = (e) => {
    setcheckQC(e.target.checked);
  };

  useEffect(() => {
    if (downloadExcelSelector) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";

      iframe.onload = handleDownloadCompletion;
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
                  if (
                    JSON.stringify(searchParametersChanged) !==
                    JSON.stringify(v)
                  )
                    setSearchParametersChanged(v);
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

                <Form.Item name="scan_by_username">
                  <Input placeholder="Scan Uploaded By" />
                </Form.Item>

                <Form.Item name="scan_end_date">
                  <RangePicker
                    placeholder={["Scan Start Date", "Scan End Date"]}
                  ></RangePicker>
                </Form.Item>

                <Space>
                  <Form.Item>
                    <Button
                      type="dashed"
                      className="search-button"
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
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <div className="flex  flex-wrap  gap-2 align-content-center">
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
        <div className="">Click checkbox to Allocate Same File</div>
        <Checkbox
          onChange={handleAllocationToDigitize}
          style={{
            width: 100,
            color: "blue",
          }}
        >
          Digitize
        </Checkbox>
        <Checkbox
          onChange={handleAllocationToQC}
          style={{
            width: 100,
            color: "blue",
          }}
        >
          QC
        </Checkbox>
        <div className="ml-auto flex align-content-center "></div>
        <div>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </div>
        <Button
          className="download-button"
          onClick={() => fetchDataaa("File_Allocation_Rectify", useUrl)}
        >
          <span>
            <DownloadOutlined />
            CSV
          </span>
        </Button>
      </div>
      <MarginContainer marginBottom="10px"> </MarginContainer>
      <Table
        bordered
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        scroll={{ ...setTableHeight(), x: 1600 }}
      />
      <Pagination
        responsive
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        total={totalCount}
        current={currentPage}
        showQuickJumpers
        pageSize={currentPageSize}
        defaultPageSize={currentPageSize}
        showTotal={(total) => `Total ${totalCount}`}
        onChange={paginationPageChange}
        style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
      />
      <div style={{ height: "20px", marginBottom: "15px" }}></div>
      <Space wrap className="flex justify-center">
        <Button
          type="primary"
          onClick={allocateRectifyFiles}
          disabled={selectedRowKeys.length === 0}
          className={`${selectedRowKeys.length === 0 ? "" : "download-button"}`}
        >
          Allocate Selected Files to Agency
        </Button>
        &nbsp;&nbsp;&nbsp;
        <a
          href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_SCAN_URL}document_ids=${selectedRowKeys}`}
          download={``}
        >
          <Button
            type="primary"
            onClick={DownlaodZipOfSelectedScanFiles}
            disabled={selectedRowKeys.length === 0 ? true : false}
            className={`${
              selectedRowKeys.length === 0 ? "" : "download-button"
            }`}
          >
            Downlaod Zip of Scan Files
          </Button>
        </a>
      </Space>
    </div>
  );
};

export default FileAllocation;
