import React, { useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Collapse,
  Divider,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  DatePicker,
} from "antd";
import { useState } from "react";
import "../fileAllocation.scss";
import "./allDocument.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  allDocumentPaginationSuperAdminAction,
  getAllDocumentListSuperAdmin,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getSearchingUrl,
  setTableHeight,
  getChangedDataPattern,
} from "../../../globals/healpers";

import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../../../style/tableStyle.scss";
import moment from "moment";
import MarginContainer from "./MarginContainer";
import { getUserRole } from "../../../utils/sessionStorage";
import JustButtonToRight from "../../CommonComponents/JustButtonToRight";

const { RangePicker } = DatePicker;
const LoggedInUserRole = getUserRole();

const AllDocumentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setcurrentPage] = useState(1);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  let { pageNumber } = useParams();
  const { onShowSizeChange, fetchDataaa } = useOutletContext();

  let rectificationDetails;

  if (LoggedInUserRole === "Super Admin") {
    rectificationDetails = [
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
        title: "District Code",
        dataIndex: "district_code",
      },
      {
        title: "Taluka",
        dataIndex: "taluka",
      },
      {
        title: "Taluka Code",
        dataIndex: "taluka_code",
      },
      {
        title: "Village",
        dataIndex: "village",
      },
      {
        title: "Village Code",
        dataIndex: "village_code",
      },
      {
        title: "Map Code",
        dataIndex: "map_code",
      },
      {
        title: "Digitize Polygon",
        dataIndex: "polygon_count",
      },
      {
        title: "QC Polygon",
        dataIndex: "qc_polygon_count",
      },
      {
        title: "Current Status",
        dataIndex: "current_status",
        width: 150,
      },
      {
        title: "BEL Uploaded Status",
        dataIndex: "bel_scan_uploaded",
        render: (text, record) => {
          const belScanUploaded = record.bel_scan_uploaded ? "1" : "0";
          const belGovScanQCApproved = record.bel_gov_scan_qc_approved
            ? "1"
            : "0";
          const belDraftUploaded = record.bel_draft_uploaded ? "1" : "0";
          const belGovDraftQCApproved = record.bel_gov_draft_qc_approved
            ? "1"
            : "0";
          return `${belScanUploaded}${belGovScanQCApproved}${belDraftUploaded}${belGovDraftQCApproved}`;
        },
      },
      {
        title: "Scan Uploaded By",
        dataIndex: "tippen_uploaded_by_username",
        width: 150,
      },
      {
        title: "Scan Uploaded Date",
        dataIndex: "tippen_uploaded_date",
        width: 180,

        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      // {
      //   title: "Rectify Agency",
      //   dataIndex: "rectify_agency_name",
      //   width: 170,
      // },
      // {
      //   title: "Rectify User",
      //   dataIndex: "rectify_by_username",
      //   width: 170,
      // },
      // {
      //   title: "Rectify Date",
      //   dataIndex: "rectify_completed_date",
      //   width: 170,
      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },
      // {
      //   title: "Rectify Remarks",
      //   dataIndex: "remarks",
      //   width: 170,
      // },
      {
        title: "Digitize Agency",
        dataIndex: "tippen_digitize_agency_id_agency_name",
      },
      {
        title: "Digitize User",
        dataIndex: "tippen_digitize_by_username",
        width: 170,
      },
      {
        title: "Digitize Date",
        dataIndex: "tippen_digitize_completed_date",
        width: 170,

        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      {
        title: "Digitize Remarks",
        dataIndex: "tippen_digitize_remarks",
        width: 170,
      },
      {
        title: "QC Agency",
        dataIndex: "tippen_qc_agency_id_agency_name",
      },
      {
        title: "QC Assign Date",
        dataIndex: "tippen_qc_assign_date",
        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      {
        title: "QC User",
        dataIndex: "tippen_qc_by_username",
      },
      {
        title: "QC Date",
        dataIndex: "tippen_qc_completed_date",
        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      {
        title: "QC Remarks",
        dataIndex: "tippen_qc_remarks",
        width: 170,
      },
      {
        title: "Govt QC Assign Date",
        dataIndex: "tippen_gov_qc_assign_date",
        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      {
        title: "Govt QC User",
        dataIndex: "gov_qc_by_username",
      },
      {
        title: "Govt QC Date",
        dataIndex: "tippen_gov_qc_completed_date",
        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      // {
      //   title: "Topology Agency Name",
      //   dataIndex: "topology_agency_name",
      // },
      // {
      //   title: "Shape Agency Name",
      //   dataIndex: "shape_agency_name",
      // },
     
      // {
      //   title: "Shape By Username",
      //   dataIndex: "shape_by_username",
      // },

      // {
      //   title: "Topology By Username",
      //   dataIndex: "topology_by_username",
      // },

      // {
      //   title: "Topology Assign Date",
      //   dataIndex: "topology_assign_date",
      // },
      // {
      //   title: "Topology Completed Date",
      //   dataIndex: "topology_completed_date",
      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },

      // {
      //   title: "Shape Assign Date",
      //   dataIndex: "shape_assign_date",
      // },
      // {
      //   title: "Shape Completed Date",
      //   dataIndex: "shape_completed_date",
      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },
      {
        title: "Check BEL Uploaded Status",
        dataIndex: "bel_scan_uploaded",
        render: (text, record) => {
          const checkbelScanUploaded = record.chk_bel_scan_uploaded;
          const checkbelGovScanQCApproved = record.chk_bel_draft_uploaded;
          const checkbelDraftUploaded = record.chk_bel_gov_scan_qc_approved;
          const checkbelGovDraftQCApproved = record.chk_bel_gov_draft_qc_approved;
          return `${checkbelScanUploaded}${checkbelGovScanQCApproved}${checkbelDraftUploaded}${checkbelGovDraftQCApproved}`;
        },
      },
      
    ];
  } else if (LoggedInUserRole === "Agency Admin") {
    rectificationDetails = [
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
        title: "District Code",
        dataIndex: "district_code",
      },
      {
        title: "Taluka",
        dataIndex: "taluka",
      },
      {
        title: "Taluka Code",
        dataIndex: "taluka_code",
      },
      {
        title: "Village",
        dataIndex: "village",
      },
      {
        title: "Village Code",
        dataIndex: "village_code",
      },
      {
        title: "Map Code",
        dataIndex: "map_code",
      },
      {
        title: "Polygon Count",
        dataIndex: "polygon_count",
      },
      {
        title: "Current Status",
        dataIndex: "current_status",
        width: 150,
        // render: (text) => {
        //   // Check if the text includes the word "Digitize"
        //   if (text.includes("Digitize") || text.includes("Rectify")) {
        //     return text; // Displays the original text if it contains "Digitize" or "Rectify"
        //   } else {
        //     // return null; // Hides the status
        //     return "Processing"; // Or any other hardcoded value to display
        //   }
        // },

        
      },
      {
        title: "Scan Uploaded By",
        dataIndex: "tippen_uploaded_by_username",
        width: 150,
      },
      {
        title: "Scan Uploaded Date",
        dataIndex: "tippen_uploaded_date",
        width: 180,

        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
      // {
      //   title: "Rectify Agency",
      //   dataIndex: "rectify_agency_name",
      //   width: 170,
      // },
      // {
      //   title: "Rectify User",
      //   dataIndex: "rectify_by_username",
      //   width: 170,
      // },
      // {
      //   title: "Rectify Date",
      //   dataIndex: "rectify_completed_date",
      //   width: 170,

      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },
      {
        title: "Digitize Agency",
        dataIndex: "digitize_agency_name",
        width: 250,
      },
      {
        title: "Digitize User",
        dataIndex: "digitize_by_username",
        width: 170,
      },
      {
        title: "Digitize Date",
        dataIndex: "digitize_completed_date",
        width: 170,

        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },

      // {
      //   title: "Shape By Username",
      //   dataIndex: "shape_by_username",
      // },

      // {
      //   title: "Topology By Username",
      //   dataIndex: "topology_by_username",
      // },

      // {
      //   title: "Topology Assign Date",
      //   dataIndex: "topology_assign_date",
      // },
      // {
      //   title: "Topology Completed Date",
      //   dataIndex: "topology_completed_date",
      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },

      // {
      //   title: "Shape Assign Date",
      //   dataIndex: "shape_assign_date",
      // },
      // {
      //   title: "Shape Completed Date",
      //   dataIndex: "shape_completed_date",
      //   render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      // },
    

    ];
  } else if (
    LoggedInUserRole === "Taluka Admin" ||
    LoggedInUserRole === "District Admin"
  ) {
    rectificationDetails = [
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
        title: "District Code",
        dataIndex: "district_code",
      },
      {
        title: "Taluka",
        dataIndex: "taluka",
      },
      {
        title: "Taluka Code",
        dataIndex: "taluka_code",
      },
      {
        title: "Village",
        dataIndex: "village",
      },
      {
        title: "Village Code",
        dataIndex: "village_code",
      },
      {
        title: "Map Code",
        dataIndex: "map_code",
      },
      {
        title: "Current Status",
        dataIndex: "current_status",
        width: 150,
      },
      {
        title: "Scan By",
        dataIndex: "scan_by_username",
        width: 180,
      },
      {
        title: "Scan Uploaded Date",
        dataIndex: "scan_uploaded_date",
        width: 180,
        render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
      },
    ];
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [selectedTableRows, setselectedTableRows] = useState([]);
  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [useUrl, setuseUrl] = useState(URLS.GET_ALL_DOCUMENT_LIST_SUPER_ADMIN);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const selector = useSelector((state) => state.allDocumentListSuperAdmin);

  useEffect(() => {
    if (selector && selector.results) {
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
    if (!selector?.results) {
      setcurrentPage(parseInt(pageNumber));
      dispatch(
        getAllDocumentListSuperAdmin({
          URL: URLS.GET_ALL_DOCUMENT_LIST_SUPER_ADMIN + `page=${pageNumber}`,
        })
      );
    }
  }, [selector]);

  let columns = rectificationDetails;

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedTableRows(selections);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function DownlaodZipOfSelectedFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  function getPageDetails(url) {
    dispatch(allDocumentPaginationSuperAdminAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    navigate(`/home/allDocumentList/page=/${page}`);

    let url = getCurrentPageUrl(page);
    dispatch(allDocumentPaginationSuperAdminAction({ URL: url }));
  }

  const [form] = Form.useForm();
  const [prevSearchedValue, setPrevSearchedValue] = useState();

  const onFinish = (values) => {
    if (values["scan_end_date"]) {
      let start = values["scan_end_date"][0];
      let end = values["scan_end_date"][1];
      values["scan_start_date"] = getChangedDataPattern(start);
      values["scan_end_date"] = getChangedDataPattern(end);
    }

    if (values["rectify_end_date"]) {
      let start = values["rectify_end_date"][0];
      let end = values["rectify_end_date"][1];

      values["rectify_start_date"] = getChangedDataPattern(start);
      values["rectify_end_date"] = getChangedDataPattern(end);
    }

    if (values["digitize_end_date"]) {
      let start = values["digitize_end_date"][0];
      let end = values["digitize_end_date"][1];

      values["digitize_start_date"] = getChangedDataPattern(start);
      values["digitize_end_date"] = getChangedDataPattern(end);
    }

    if (values["qc_assign_end_date"]) {
      let start = values["qc_assign_end_date"][0];
      let end = values["qc_assign_end_date"][1];

      values["qc_assign_start_date"] = getChangedDataPattern(start);
      values["qc_assign_end_date"] = getChangedDataPattern(end);
    }

    if (values["qc_end_date"]) {
      let start = values["qc_end_date"][0];
      let end = values["qc_end_date"][1];

      values["qc_start_date"] = getChangedDataPattern(start);
      values["qc_end_date"] = getChangedDataPattern(end);
    }

    if (values["gov_qc_assign_end_date"]) {
      let start = values["gov_qc_assign_end_date"][0];
      let end = values["gov_qc_assign_end_date"][1];

      values["gov_qc_assign_start_date"] = getChangedDataPattern(start);
      values["gov_qc_assign_end_date"] = getChangedDataPattern(end);
    }

    if (values["gov_qc_end_date"]) {
      let start = values["gov_qc_end_date"][0];
      let end = values["gov_qc_end_date"][1];

      values["gov_qc_completed_start_date"] = getChangedDataPattern(start);
      values["gov_qc_completed_end_date"] = getChangedDataPattern(end);
    }

    if (values["topology_assign_end_date"]) {
      let start = values["topology_assign_end_date"][0];
      let end = values["topology_assign_end_date"][1];

      values["topology_assign_start_date"] = getChangedDataPattern(start);
      values["topology_assign_end_date"] = getChangedDataPattern(end);
    }

    if (values["topology_end_date"]) {
      let start = values["topology_end_date"][0];
      let end = values["topology_end_date"][1];

      values["topology_start_date"] = getChangedDataPattern(start);
      values["topology_end_date"] = getChangedDataPattern(end);
    }
    if (values["shape_assign_end_date"]) {
      let start = values["shape_assign_end_date"][0];
      let end = values["shape_assign_end_date"][1];

      values["shape_assign_start_date"] = getChangedDataPattern(start);
      values["shape_assign_end_date"] = getChangedDataPattern(end);
    }

    if (values["shape_end_date"]) {
      let start = values["shape_end_date"][0];
      let end = values["shape_end_date"][1];

      values["shape_start_date"] = getChangedDataPattern(start);
      values["shape_end_date"] = getChangedDataPattern(end);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.GET_ALL_DOCUMENT_LIST_SUPER_ADMIN;
    let url = getSearchingUrl(values, keys);
    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (prevSearchedValue) onFinish(prevSearchedValue);
  }, [prevSearchedValue]);

  const onReset = () => {
    setuseUrl(URLS.GET_ALL_DOCUMENT_LIST_SUPER_ADMIN);
    form.resetFields();
  };

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);

  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
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
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="b-2">
      <Divider orientation="left">All Tippen Document List</Divider>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                form={form}
                name="searchForm"
                layout="inline"
                initialValues={{
                  remember: true,
                }}
                onFinish={(v) => {
                  if (JSON.stringify(prevSearchedValue) !== JSON.stringify(v))
                    setPrevSearchedValue(v);
                }}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >  
                <Form.Item
                  name="barcode_number"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "Barcode code must be a number",
                    },
                  ]}
                >
                  <Input placeholder="Barcode Number" />
                </Form.Item>

                <Form.Item name="file_name">
                  <Input placeholder="File Name" />
                </Form.Item>

              

                <Form.Item
                  name="district_name"
                  rules={[
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  ]}
                >
                  <Input placeholder="District Name" />
                </Form.Item>

                <Form.Item
                  name="district_code"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "District code must be a number",
                    },
                  ]}
                >
                  <Input placeholder="District Code" />
                </Form.Item>
                <Form.Item
                  name="taluka_name"
                  rules={[
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  ]}
                >
                  <Input placeholder="Taluka Name" />
                </Form.Item>
                <Form.Item
                  name="taluka_code"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "Taluka code must be a number",
                    },
                  ]}
                >
                  <Input placeholder="Taluka Code" />
                </Form.Item>
                <Form.Item
                  name="village_name"
                  rules={[
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  ]}
                >
                  <Input placeholder="Village Name" />
                </Form.Item>

                <Form.Item
                  name="village_code"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "Village code must be a number",
                    },
                  ]}
                >
                  <Input placeholder="Village Code" />
                </Form.Item>


                <Form.Item name="map_code"
                  rules={[
                    {
                      required: false,
                      message: 'Please input the map code!',
                    },
                    {
                      // Use a regular expression to limit input to exactly 2 digits
                      pattern: new RegExp(/^\d{2}$/),
                      message: 'Map code must be 2 digits only 01-13',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || (value >= 1 && value <= 13)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Map code must be within 01-13'));
                        // return Promise.reject(new Error(''));
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Map Code 01-13" maxLength={2} />
                </Form.Item>

                <Form.Item
                  name="current_status"
                  rules={[
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  ]}
                >
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

                <Form.Item name="rectify_agency_name">
                  <Input placeholder="Rectify Agency Name" />
                </Form.Item>

                <Form.Item name="rectify_by_username">
                  <Input placeholder="Rectify User Name" />
                </Form.Item>

                <Form.Item name="rectify_end_date">
                  <RangePicker
                    placeholder={["Rectify Start Date", "Rectify End Date"]}
                  ></RangePicker>
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


                {LoggedInUserRole === "Super Admin" && (
                  <>
                    <Form.Item name="qc_agency_name">
                      <Input placeholder="QC Agency" />
                    </Form.Item>
                    <Form.Item name="qc_assign_end_date">
                      <RangePicker
                        placeholder={["QC Assign Date", "QC Assign End Date"]}
                      />
                    </Form.Item>

                    <Form.Item name="qc_by_username">
                      <Input placeholder="QC By" />
                    </Form.Item>

                    <Form.Item name="qc_end_date">
                      <RangePicker
                        placeholder={["QC Start Date", "QC End Date"]}
                      />
                    </Form.Item>

                    <Form.Item name="gov_qc_assign_end_date">
                      <RangePicker
                        placeholder={[
                          "Gov QC Assign Date",
                          "Gov QC Assign End Date",
                        ]}
                      />
                    </Form.Item>

                    <Form.Item name="topology_assign_end_date">
                      <RangePicker
                        placeholder={[
                          "Topology Assign Date",
                          "Topology Assign End Date",
                        ]}
                      />
                    </Form.Item>

                    <Form.Item name="topology_end_date">
                      <RangePicker
                       placeholder={[
                        "Topology Start Date",
                        "Topology End Date",
                       ]}
                       />
                    </Form.Item>
                    <Form.Item name="shape_assign_end_date">
                      <RangePicker
                        placeholder={[
                          "Shape Assign Date",
                          "Shape Assign End Date",
                        ]}
                      />
                    </Form.Item>

                    <Form.Item name="shape_end_date">
                      <RangePicker
                       placeholder={[
                        "Shape Start Date",
                        "Shape End Date",
                       ]}
                       />
                    </Form.Item>

                    <Form.Item name="gov_qc_by_username">
                      <Input placeholder="Gov QC By" />
                    </Form.Item>

                    <Form.Item name="gov_qc_end_date">
                      <RangePicker
                        placeholder={["Gov QC Start Date", "Gov QC End Date"]}
                      />
                    </Form.Item>

                    <Form.Item name="polygon_min">
                      <Input placeholder="Digitize Polygon Min" />
                    </Form.Item>

                    <Form.Item name="polygon_max">
                      <Input placeholder="Digitize Polygon Max" />
                    </Form.Item>


                    <Form.Item name="qc_polygon_min">
                      <Input placeholder="QC Polygon Min" />
                    </Form.Item>

                    <Form.Item name="qc_polygon_max">
                      <Input placeholder="QC Polygon Max" />
                    </Form.Item>


                    <Form.Item name="bel_scan_uploaded">
                      <Input placeholder="BEL Scan Uploaded" />
                    </Form.Item>

                    <Form.Item name="bel_gov_scan_qc_approved">
                      <Input placeholder="BEL Gov Scan QC Approved" />
                    </Form.Item>

                    <Form.Item name="bel_draft_uploaded">
                      <Input placeholder="BEL Draft Uploaded" />
                    </Form.Item>

                    <Form.Item name="bel_gov_draft_qc_approved">
                      <Input placeholder="BEL Gov Draft QC Approved" />
                    </Form.Item>
                     
                    <Form.Item name="topology_agency_name">
                      <Input placeholder="Topology Agency Name" />
                    </Form.Item>

                    <Form.Item name="topology_by_username">
                      <Input placeholder="Topology By Username" />
                    </Form.Item>

                    <Form.Item name="shape_by_username">
                      <Input placeholder="Shape By Username" />
                    </Form.Item>

                    <Form.Item name="shape_agency_name">
                      <Input placeholder="Shape Agency Name" />
                    </Form.Item>

                    <Form.Item name="chk_bel_scan_uploaded">
                      <Input placeholder="Check Bel Scan Uploaded" />
                    </Form.Item>

                    <Form.Item name="chk_bel_draft_uploaded">
                      <Input placeholder="Check Bel Draft Uploaded" />
                    </Form.Item>

                    <Form.Item name="chk_bel_gov_scan_qc_approved">
                      <Input placeholder="Check Bel Gov Scan QC Approve" />
                    </Form.Item>

                    <Form.Item name="chk_bel_gov_draft_qc_approved">
                      <Input placeholder="Check Bel Gov Draft Qc Approve" />
                    </Form.Item>

                    
                  </>
                )}

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
                      htmlType="submit"

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
      <MarginContainer marginBottom="10px"></MarginContainer>
      <JustButtonToRight>
        <div> {hasSelected ? `Selected ${selectedRowKeys.length}` : ""}</div>
        {(LoggedInUserRole === "Super Admin" ||
          LoggedInUserRole === "Agency Admin"||
          LoggedInUserRole === "District Admin") && (
          <Button
            className="download-button"
            disabled={isButtonDisabled}
            onClick={() => {
              fetchDataaa("All_Document_List_CSV", useUrl);
            }}
          >
            <span>
              <DownloadOutlined /> CSV
            </span>
          </Button>
        )}
      </JustButtonToRight>

      <MarginContainer marginBottom="10px"></MarginContainer>
      <div className="mb-5">
        <Table
          bordered
          colSpan={2}
          responsive
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{
            ...setTableHeight(),
            x:
              LoggedInUserRole === "Agency Admin"
                ? 2850
                : LoggedInUserRole === "District Admin" ||
                  LoggedInUserRole === "Taluka Admin"
                ? 1800
                : 6000,
          }}
        />
        <Pagination
          responsive
          onShowSizeChange={(current, pageSize) =>
            onShowSizeChange(current, pageSize)
          }
          showPage
          showSizeChanger
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
          style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
        />
      </div>
      <Space className="mt-5 justify-center w-full" wrap>
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_SCAN_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="dashed"
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
              loading={loadingSelected}
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Scan
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_RECTIFY_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
              loading={loadingSelected}
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Rectify
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_DIGITIZE_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Digitize
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_QC_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip QC
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_PDF_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip PDF
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_GOV_QC_DWG_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Gov QC DWG
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_GOV_QC_PDF_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Gov QC PDF
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_TOPOLOGY_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Topology
              </span>
            </Button>
          </a>
        )}
        {LoggedInUserRole === "Super Admin" && (
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_SHAPE_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Zip Shape
              </span>
            </Button>
          </a>
        )}
      </Space>
    </div>
  );
};

export default AllDocumentList;
