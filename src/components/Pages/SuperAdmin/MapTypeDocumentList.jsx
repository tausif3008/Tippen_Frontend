import React, { useEffect } from "react";
import { Button, Divider, Form, Select, Space, Table, Collapse, DatePicker } from "antd";
import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  agencyListingAction,
  getDistrictList,
  getMapTypeDocumentList,
  getTalukaListMapTypeAction,
  getVillageAction,
  setTalukaListMapTypeFalse,
  setVillageListFalse,
} from "../../../store/Actions/BaseAction";
import "../../../style/commonStyle.scss";
import { setTableHeight, getChangedDataPattern } from "../../../globals/healpers";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import { URLS } from "../../../globals/urls";
import "./MapTypeDocumentList.scss";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import JustButtonToRight from "./../../CommonComponents/JustButtonToRight";

const { RangePicker } = DatePicker;

const MapTypeDocumentList = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  let columns = [
    { title: "Map Name", dataIndex: "mapname_english" },
    // {
    //   title: "Map Code",
    //   dataIndex: "map_code",
    // },
    // { title: "Scan Uploaded", dataIndex: "total_scan_uploaded" },
    {
      title: "District",
      dataIndex: "district_name",
    },
    {
      title: "Talula",
      dataIndex: "taluka_name",
    },
    {
      title: "Village",
      dataIndex: "village_name",
    },
    // { title: "Rectify Completed ", dataIndex: "rectify_completed" },
    { title: "Digitize Map ", dataIndex: "digitize_completed" },
    { title: "Digitize Polygon", dataIndex: "polygon_count" },

    { title: "QC Map", dataIndex: "qc_completed" },
    { title: "QC Polygon", dataIndex: "qc_polygon_count" },

    // { title: "BEL Scan", dataIndex: "bel_scan_uploaded" },
    { title: "BEL Draft Map", dataIndex: "bel_draft_uploaded" },   
    { title: "BEL Draft Polygon", dataIndex: "bel_draft_qcpolygon_count" },  
    { title: "Govt Approved Map", dataIndex: "bel_gov_draft_qc_approved" },
    { title: "Govt Approved Polygon", dataIndex: "bel_draft_approved_qcpolygon_count" },
    { title: "Shape", dataIndex: "shape_completed" },
  ];

  const [tableData, settableData] = useState([]);
  const [totalFileList, setTotalFileList] = useState(0);
  const [selectedAgencyID, setselectedAgencyID] = useState(null);
  const [selectAgency, setselectAgency] = useState([]);
  const agencySelector = useSelector((state) => state.agencyList);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };

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

  useEffect(() => {
    if (!selector)
      dispatch(
        getMapTypeDocumentList({
          URL: URLS.GET_COMPLETED_FILES_ACCORDING_TO_MAP_TYPE_URL,
        })
      );
  }, []);

  let thisPageMainUrl = false;
  const selector = useSelector((state) => state.mapTypeReports);
  if (selector && thisPageMainUrl === false) {
    thisPageMainUrl = selector.next;
  }

  useEffect(() => {
    if (selector) {
      let matTypeTableData = [];
      const rawData = selector.counts_by_maptype;
      setTotalFileList(rawData.length);
      for (let index = 0; index < rawData.length; index++) {
        matTypeTableData.push({
          ...rawData[index],
          district_name:
            rawData[index]["district_name"] === ""
              ? "-"
              : rawData[index]["district_name"],
          village_name:
            rawData[index]["village_name"] === ""
              ? "-"
              : rawData[index]["village_name"][0],
          taluka_name:
            rawData[index]["taluka_name"] === ""
              ? "-"
              : rawData[index]["taluka_name"][0],
        });
      }

      settableData(matTypeTableData);
    }
  }, [selector]);

  const districtSelector = useSelector((state) => state.districtListResult);
  const talukaSelector = useSelector((state) => state.talukaListMapTypeList);
  const [districtListResult, setdistrictListResult] = useState([]);
  const [talukaDetailsList, settalukaDetailsList] = useState([]);
  const villageListSelector = useSelector((state) => state.villageListMapType);
  const [villageListDetails, setvillageListDetails] = useState([]);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));
    if (!districtSelector) dispatch(getDistrictList({}));
  }, []);

  useEffect(() => {
    if (districtSelector) {
      let rawDistrictDetails = districtSelector.data;
      let theDistrictList = [];

      for (let index = 0; index < rawDistrictDetails.length; index++) {
        theDistrictList.push({
          label: rawDistrictDetails[index]["district_name"],
          value: rawDistrictDetails[index]["district_code"],
        });
      }
      setdistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  function getTalukaList(value) {
    form.setFieldValue("select-taluka", "Select Taluka");
    form.setFieldValue("select-village", "Select Village");
    dispatch(setVillageListFalse());
    dispatch(setTalukaListMapTypeFalse());

    const url = URLS.GET_TALUKA_LIST_URL + value + "/";
    dispatch(getTalukaListMapTypeAction({ URL: url }));
  }

  useEffect(() => {
    if (talukaSelector && talukaSelector.data1) {
      let rawTalukaData = talukaSelector.data1;
      let theTalukaDetails = [];

      for (let index = 0; index < rawTalukaData.length; index++) {
        theTalukaDetails.push({
          label: rawTalukaData[index]["taluka_name"],
          value: rawTalukaData[index]["taluka_code"],
        });
      }
      settalukaDetailsList(theTalukaDetails);
    }
  }, [talukaSelector]);

  function getVillageList(value) {
    dispatch(setVillageListFalse());
    form.resetFields(["village"]);
    const url = URLS.GET_VILLAGE_LIST_URL + value + "/";
    dispatch(getVillageAction({ URL: url }));
  }

  useEffect(() => {
    if (villageListSelector && villageListSelector.data1) {
      let villageRawDetails = villageListSelector.data1;
      let villageDetails = [];

      for (let index = 0; index < villageRawDetails.length; index++) {
        villageDetails.push({
          label: villageRawDetails[index]["village_name"],
          value: villageRawDetails[index]["village_code"],
        });
      }
      setvillageListDetails(villageDetails);
    }
  }, [villageListSelector]);

  function handleDownloadColumns() {
    const tableHeaders = [
      "Map Name",
      "District Name",
      "Talula Name",
      "Village Name",
      // "Rectify Completed ",
      "Digitize Completed ",
      "Digitize Polygon ",
      "QC Completed",
      "QC Polygon",
      // "Map Code",
      // "BEL Scan Uploaded",
      "BEL Draft Map",
      "BEL Draft Polygon",
      "Govt Approved Map",
      "Govt Approved Polygon",
    ];
    return tableHeaders;
  }

  function handleDownloadData() {
    let tableDetailss = [];
    for (let index = 0; index < tableData.length; index++) {
      let row = [];
      row.push(tableData[index]["mapname_english"]);
      row.push(tableData[index]["district_name"]);
      row.push(tableData[index]["taluka_name"]);
      row.push(tableData[index]["village_name"]);
      // row.push(tableData[index]["rectify_completed"]);
      row.push(tableData[index]["digitize_completed"]);
      row.push(tableData[index]["polygon_count"]);
      row.push(tableData[index]["qc_completed"]);
      row.push(tableData[index]["qc_polygon_count"]);
      // row.push(tableData[index]["map_code"]);
      // row.push(tableData[index]["bel_scan_uploaded"]);
      row.push(tableData[index]["bel_draft_uploaded"]);
      row.push(tableData[index]["bel_draft_qcpolygon_count"]);
      row.push(tableData[index]["bel_gov_draft_qc_approved"]);
      row.push(tableData[index]["bel_draft_approved_qcpolygon_count"]);
      tableDetailss.push(row);
    }
    return tableDetailss;
  }

  // const callGeneratePDF = () => {

  //   // Check if tableData exists and has entries
  //   const agencyName = Array.isArray(tableData) && tableData.length > 0
  //   ? tableData[0].agency_name || "Agency Name"
  //   : "Agency Name..";


  //   generatePDF(
  //     "Map Type Report: " + agencyName,
  //     "map_type_files",
  //     handleDownloadColumns(),
  //     handleDownloadData(), 
  //   );
  // };

    const [historyButtons, sethistoryButtons] = useState([]);

    const callGeneratePDF = () => {
    const agencyName = Array.isArray(tableData) && tableData.length > 0
      ? tableData[0].agency_name || "Agency Name"
      : "Agency Name..";

    const startDate = tableData[0]?.start_date || "N/A";
    const endDate = tableData[0]?.end_date || "N/A";

    const tableHeaders = Object.values(columns); // original column object
    const tableHeadersNew = [];    // array of dataIndex
    const tableHeadersNames = [];  // array of display column names

    let pdfTablelength = historyButtons.length === 3
      ? tableHeaders.length
      : tableHeaders.length - 1;

    for (let index = 0; index < pdfTablelength; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    const tableDetails = [];
    const totals = new Array(tableHeadersNew.length).fill(0);

    for (let i = 0; i < tableData.length; i++) {
      const row = [];

      for (let j = 0; j < tableHeadersNew.length; j++) {
        const value = tableData[i][tableHeadersNew[j]];
        row.push(value);

        if (!isNaN(value) && value !== null && value !== "") {
          totals[j] += parseFloat(value);
        }
      }

      tableDetails.push(row);
    }

    // Set first column as "Total", rest are numeric totals
    totals[0] = "Total";
    tableDetails.push(totals);

    // Generate PDF
    generatePDF(
      "Map Type Report: " + agencyName + PDF_Date_title,
      "map_type_files",
      tableHeadersNames,
      tableDetails
    );
  };


  const [canSearch, setCanSearch] = useState();

  const [PDF_Date_title, setTitle] = useState(" - All Dates");
  
  const [dateRange, setDateRange] = useState({});
  

  const onFinish = (values) => {
    let mapTypeFilters = "";

    if (values["select-agency"]) {
      if (values["select-agency"] !== "Select Agency")
        mapTypeFilters += "agency_name=" + values["select-agency"] + "&";
    }

    if (values["select-district"]) {
      if (values["select-district"] !== "Select District")
        mapTypeFilters += "district_name=" + values["select-district"] + "&";
    }

    if (values["select-taluka"] !== "Select Taluka") {
      if (values["select-taluka"])
        mapTypeFilters += "taluka_name=" + values["select-taluka"] + "&";
    }

    if (values["select-village"] !== "Select Village")
    {
      if (values["select-taluka"])
        mapTypeFilters += "village_name=" + values["select-village"] + "&";
    }

    if (values["digitize_end_date"])
    {
        let start = values["digitize_end_date"][0];
        let end = values["digitize_end_date"][1];
  
        values["digitize_start_date"] = getChangedDataPattern(start);
        values["digitize_end_date"] = getChangedDataPattern(end);

        mapTypeFilters += "start_date=" + values["digitize_start_date"] + "&";
        mapTypeFilters += "end_date=" + values["digitize_end_date"] + "&";

      }

      if (dateRange.start_date) {
        let PDF_Date_title = " - All Dates";
  
        if (dateRange.start_date) {
          PDF_Date_title = " - from " + dateRange.start_date + " to " + dateRange.end_date;
        }
  
        setTitle(PDF_Date_title);
      }
    
    dispatch(
      getMapTypeDocumentList({
        URL:
          URLS.GET_COMPLETED_FILES_ACCORDING_TO_MAP_TYPE_URL + mapTypeFilters,
      })
    );
  };

  useEffect(() => {
    if (canSearch) onFinish(canSearch);
  }, [canSearch]);

  const resetSearchFilters = () => {
    form.resetFields();
    form.setFieldValue("select-district", "Select District");
  };

  return (
    <>
      <Divider orientation="left">Map Type Details</Divider>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                form={form}
                layout="vertical"
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={(v) => {
                  if (JSON.stringify(v) !== JSON.stringify(canSearch))
                    setCanSearch(v);
                }}
                autoComplete="off"
              >
                <Space wrap>
                  <Form.Item name={"select-agency"} noStyle>
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
                  </Form.Item>
                  <Form.Item name={"select-district"} noStyle>
                    <Select
                      optionFilterProp="label"
                      showSearch
                      defaultValue="Select District"
                      style={{
                        width: 300,
                      }}
                      onChange={getTalukaList}
                      options={districtListResult}
                    />
                  </Form.Item>
                  <Form.Item name={"select-taluka"} noStyle>
                    <Select
                      optionFilterProp="label"
                      showSearch
                      defaultValue="Select Taluka"
                      style={{
                        width: 300,
                      }}
                      onChange={getVillageList}
                      options={talukaDetailsList}
                    />
                  </Form.Item>
                  <Form.Item name={"select-village"} noStyle>
                    <Select
                      optionFilterProp="label"
                      showSearch
                      defaultValue="Select Village"
                      style={{
                        width: 300,
                      }}
                      options={villageListDetails}
                    />
                  </Form.Item><br/>
                  <Form.Item name="digitize_end_date">
                    <RangePicker
                      placeholder={["Digitize Start Date", "Digitize End Date"]}
                    ></RangePicker>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button
                      type="dashed"
                      htmlType="submit"
                      className="download-button"
                    >
                      Search
                    </Button>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button
                      type="primary"
                      className="clear-button"
                      onClick={resetSearchFilters}
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
      <div className="flex w-full flex-wrap justify-end gap-2 ">
        <Button
          type="dashed"
          onClick={callGeneratePDF}
          className="download-button"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> PDF
          </span>{" "}
        </Button>
        <Button type="dashed" className="download-button">
          <CSVLink
            filename={"Map_type_records"}
            data={handleDownloadData()}
            headers={handleDownloadColumns()}
          >
            <span>
              <DownloadOutlined></DownloadOutlined> Excel
            </span>
          </CSVLink>
        </Button>
      </div>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

      <Table
        bordered
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ ...setTableHeight(), x: 1800 }}
      />
      <div style={{ marginTop: "10px" }}></div>
      <div>Total {totalFileList} Files</div>
    </>
  );
};

export default MapTypeDocumentList;
