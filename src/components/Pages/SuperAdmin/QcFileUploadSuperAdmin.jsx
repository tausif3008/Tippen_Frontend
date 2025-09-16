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
  GetQcFileSuperAdminAction,
  QcDetailsPagination,
  agencyListingAction,
  allocateToQCAdmin,
  downloadExcelFile,
} from "../../../store/Actions/BaseAction";

import { URLS } from "../../../globals/urls";
import {
  getSearchingUrl,
  setTableHeight,
  getChangedDataPattern,
} from "../../../globals/healpers";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const { RangePicker } = DatePicker;

const QcFileUploadSuperAdmin = () => {
  const dispatch = useDispatch();
  const { onShowSizeChange, fetchDataaa } = useOutletContext();

  const rectificationDetails = [
    {
      title: "Barcoden Number",
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
    { title: "Polygon Count", dataIndex: "polygon_count" },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed_date",
      width: 200,
      render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
    },
    {
      title: "Agency Name",
      dataIndex: "digitize_agency_name",
      width: 200,
    },
    {
      title: "Digitize By Username",
      dataIndex: "digitize_by_username",
      width: 200,
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
      width: 200,
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectedAgencyID, setselectedAgencyID] = useState(null);
  const [selectAgency, setselectAgency] = useState([]);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };

  const selector = useSelector((state) => state.qcDetailsSuperAdmin);
  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));

    if (!selector)
      dispatch(GetQcFileSuperAdminAction({ URL: URLS.GET_QC_DETAILS_URL }));
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
    dispatch(QcDetailsPagination({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(QcDetailsPagination({ URL: url }));
  }

  function allocateQCFiles() {
    if (selectedAgencyID) {
      let url = URLS.ASSIGN_QC_FILES_TO_USER + selectedAgencyID + "/";
      dispatch(allocateToQCAdmin({ document_id: selectedRowKeys, URL: url }));
    } else {
      message.info("Please select agency to assign");
    }
  }

  const agencyAllocationResponse = useSelector(
    (state) => state.qcfilesToAgencyMessage
  );

  useEffect(() => {
    if (agencyAllocationResponse) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(GetQcFileSuperAdminAction({ URL: useUrl }));
    }
  }, [agencyAllocationResponse]);

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
                <Form.Item name="polygon_min">
                  <Input placeholder="Diitize Polygon MIN" />
                </Form.Item>

                <Form.Item name="polygon_max">
                  <Input placeholder="Diitize Polygon MAX" />
                </Form.Item>

                <Form.Item name="current_status">
                  <Input placeholder="Current Status" />
                </Form.Item>
                <Form.Item name="digitize_agency_name">
                  <Input placeholder="Digitize Agency" />
                </Form.Item>
                <Form.Item name="digitize_by_username">
                  <Input placeholder="Digitize By Username" />
                </Form.Item>
                <Form.Item name="digitize_end_date">
                  <RangePicker
                    placeholder={["Digitize Start Date", "Digitize End Date"]}
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
        <div className="ml-auto">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </div>{" "}
        <Button
          className="download-button"
          onClick={() => fetchDataaa("File_Allocation_QC", useUrl)}
        >
          <span>
            <DownloadOutlined />
            CSV
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
        scroll={{ ...setTableHeight(), x: 1700 }}
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
          className={`${selectedRowKeys.length !== 0 ? "download-button" : ""}`}
          onClick={allocateQCFiles}
          disabled={selectedRowKeys.length === 0}
        >
          Allocate selected Files to Agency
        </Button>
      </div>
    </div>
  );
};

export default QcFileUploadSuperAdmin;
