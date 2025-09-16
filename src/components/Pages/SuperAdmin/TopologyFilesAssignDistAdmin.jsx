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
import "../../../style/tableStyle.scss";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import { URLS } from "../../../globals/urls";
import {
  downloadCSVFronBackend,
  getChangedDataPattern,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import MarginContainer from "./../CommonPages/MarginContainer";
import {
  agencyListingAction,
  allocateTopologySuper,
  downloadExcelFile,
  GovtQCPdfPaginationCompleteDocList,
  topologySubmitToAgency,
} from "../../../store/Actions/BaseAction";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import moment from "moment";

const TopologyFilesAssignDistAdmin = () => {
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
      title: "Topology Date",
      dataIndex: "topology_completed_date",
      render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
    },
    {
      title: "Topology By",
      dataIndex: "topology_by",
    },

    { title: "Polygon Count", dataIndex: "polygon_count" },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [selectAgency, setselectAgency] = useState([]);
  const [selectedAgencyID, setselectedAgencyID] = useState(null);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };

  const selector = useSelector((state) => state.topologyAdminUsersList);
  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));

    if (!selector)
      dispatch(
        allocateTopologySuper({
          URL: URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL,
        })
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
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [useUrl, setuseUrl] = useState(
    URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL
  );

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
    dispatch(GovtQCPdfPaginationCompleteDocList({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(GovtQCPdfPaginationCompleteDocList({ URL: url }));
  }

  function allocateTopologyFiles() {
    if (selectedAgencyID) {
      let url = URLS.ALLOCATE_TO_AGENCY_TOPOLOGY + selectedAgencyID + "/";
      dispatch(
        topologySubmitToAgency({ document_id: selectedRowKeys, URL: url })
      );
    } else {
      message.info("Please select agency to assign");
    }
  }

  function DownlaodZipOfSelectedTopologyFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  const agencyAllocationResponse = useSelector(
    (state) => state.topologyMessage
  );

  useEffect(() => {
    if (agencyAllocationResponse) {
      setSelectedRowKeys([]);
      setcurrentPage(1);
      dispatch(allocateTopologySuper({ URL: useUrl }));
    }
  }, [agencyAllocationResponse]);

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    if (values["topology_completed_date"]) {
      let start = values["topology_completed_date"][0];
      let end = values["topology_completed_date"][1];
      values["topology_assign_date"] = getChangedDataPattern(start);
      values["topology_completed_date"] = getChangedDataPattern(end);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL;
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

                <Form.Item name="map_code">
                  <Input placeholder="Map Code" />
                </Form.Item>

                <Form.Item name="topology_by">
                  <Input placeholder="Topology By" />
                </Form.Item>

                <Form.Item name="polygon_count">
                  <Input placeholder="Polygon Count" />
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
          onClick={() => fetchDataaa("File_Allocation_Topology", useUrl)}
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
        scroll={{ ...setTableHeight(), x: 1000 }}
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
          onClick={allocateTopologyFiles}
          disabled={selectedRowKeys.length === 0}
        >
          Allocate Selected Files to Agency
        </Button>
        &nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default TopologyFilesAssignDistAdmin;
