import React, { useEffect, useRef } from "react";
import { Button, Divider, Space, Table } from "antd";
import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getDistrictwiseDocumentList,
  getTalukaMapTypeList,
  getVillageMapTypeList,
  getVillageTypeList,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import "./allDocument.scss";

import "../../../style/commonStyle.scss";
import "../../../style/tableStyle.scss";
import { setTableHeight } from "../../../globals/healpers";
import { CSVLink } from "react-csv";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

// Calculate the total count for each column
const getTotalCount = (data, dataIndex) => {
  return data.reduce((total, record) => total + record[dataIndex], 0);
};

const Reports = () => {
  const dispatch = useDispatch();

  // Define a CSS class in your component's stylesheet or CSS file

  const districtColumns = [
    {
      title: "District Name",
      dataIndex: "district_name",
    },
    {
      title: "Scan Uploaded",
      dataIndex: "total_scan_uploaded_count",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed_count",
    },
    {
      title: "BEL Scan Uploaded",
      dataIndex: "bel_scan_uploaded_count",
    },
    {
      title: "BEL Gov. Scan QC Approved",
      dataIndex: "bel_gov_scan_qc_approved_count",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed_count",
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed_count",
    },
    {
      title: "PDF Completed",
      dataIndex: "pdf_completed_count",
    },
    {
      title: "Polygon",
      dataIndex: "polygon_count",
    },
    {
      title: "BEL Draft Uploaded",
      dataIndex: "bel_draft_uploaded_count",
    },
    {
      title: "BEL Gov. Draft QC Approved",
      dataIndex: "bel_gov_draft_qc_approved_count",
    },
    {
      title: "View Taluka Records ",
      dataIndex: "talukaRecords",
      width: 200,
    },
  ];

  const talukaColumns = [
    { title: "District Name", dataIndex: "district_name" },
    {
      title: "Taluka Name",
      dataIndex: "taluka_name",
    },
    {
      title: "Scan Uploaded",
      dataIndex: "total_scan_uploaded",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed",
    },
    {
      title: "BEL Scan Uploaded",
      dataIndex: "bel_scan_uploaded_count",
    },
    {
      title: "BEL Gov. Scan QC Approved",
      dataIndex: "bel_gov_scan_qc_approved_count",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed",
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed",
    },
    {
      title: "PDF Completed",
      dataIndex: "pdf_completed",
    },
    {
      title: "Polygon",
      dataIndex: "polygon_count",
    },
    {
      title: "BEL Draft Uploaded",
      dataIndex: "bel_draft_uploaded_count",
    },
    {
      title: "BEL Gov. Draft QC Approved",
      dataIndex: "bel_gov_draft_qc_approved_count",
    },
    {
      title: "View Village Records",
      dataIndex: "talukaRecords",
      width: 200,
    },
  ];

  const villageColumns = [
    { title: "District Name", dataIndex: "district_name" },
    { title: "taluka_name", dataIndex: "taluka_name" },
    {
      title: "Village Name",
      dataIndex: "village_name",
    },
    {
      title: "Scan Uploaded",
      dataIndex: "total_scan_uploaded",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed",
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed",
    },
    {
      title: "PDF Completed",
      dataIndex: "pdf_completed",
    },
    {
      title: "Village Wise Map Type Count",
      dataIndex: "villageMapTypeDetails",
      width: 200,
    },
  ];

  const villageMapTypeColumns = [
    {
      title: "Map Type Name",
      dataIndex: "mapname_english",
    },
    {
      title: "Total Scan Uploaded",
      dataIndex: "total_scan_uploaded",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed",
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed",
    },
    {
      title: "PDF Completed",
      dataIndex: "pdf_completed",
    },
    { title: "Polygon Count", dataIndex: "polygon_count" },
  ];

  const [columns, setcolumns] = useState(districtColumns);
  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(0);

  const [allTableRecords, setallTableRecords] = useState({
    district: [],
    taluka: [],
    village: [],
    mapType: [],
  });

  const [reportsDividerTitle, setReportsDividerTitle] = useState(
    "District Wise Cumulative Report"
  );

  const [historyButtons, sethistoryButtons] = useState([]);

  // ------ district wise records ------
  const selector = useSelector((state) => state.districtWiseDocumentList);

  useEffect(() => {
    dispatch(
      getDistrictwiseDocumentList({
        URL: URLS.GET_DISTRICT_WISE_DOCUMENT_LIST,
      })
    );
    return () => {
      sethistoryButtons([]);
      setcolumns(districtColumns);
    };
  }, []);

  let thisPageMainUrl = false;

  if (selector && thisPageMainUrl === false) {
    thisPageMainUrl = selector.next;
  }

  useEffect(() => {
    if (selector) {
      sethistoryButtons([]);
      setReportsDividerTitle("District Wise Cumulative Report");
      let reportDetails = [];

      let data = selector.filter(
        (element) => element.total_scan_uploaded_count > 0
      );

      for (let index = 0; index < data.length; index++) {
        reportDetails.push({
          ...data[index],
          talukaRecords: (
            <Button
              type="primary"
              className="upload-button"
              onClick={() => showTalukaRecords(data[index]["district_code"])}
            >
              <span className="mr-1">
                <EyeOutlined /> View Taluka Records
              </span>{" "}
            </Button>
          ),
        });
      }

      settotalCount(reportDetails.length);

      let allTableRecordsNew = { ...allTableRecords };
      allTableRecordsNew["district"] = reportDetails;
      setallTableRecords(allTableRecordsNew);

      settableData(reportDetails);
    }
  }, [selector]);

  // ------ taluka wise records ------

  function showTalukaRecords(districtCode) {
    setcolumns(talukaColumns);
    dispatch(
      getTalukaMapTypeList({
        URL: URLS.GET_TALUKA_WISE_COMPLETED_FILES + districtCode + "/",
      })
    );
  }

  const talukaWiseReportsSelector = useSelector(
    (state) => state.talukaWiseReports
  );

  useEffect(() => {
    if (talukaWiseReportsSelector) {
      let historyButtonsNew = [...historyButtons];

      historyButtonsNew.push(
        <Button
          type="primary"
          onClick={managePrevNextRecordTables1}
          className="upload-button"
        >
          District Records
        </Button>
      );

      sethistoryButtons(historyButtonsNew);
      setReportsDividerTitle("Taluka Wise Cumulative Report");

      const talukaRawDetails = talukaWiseReportsSelector.counts_by_taluka;
      let reportDetails = [];

      for (let index = 0; index < talukaRawDetails.length; index++) {
        reportDetails.push({
          ...talukaRawDetails[index],
          talukaRecords: (
            <Button
              type="primary"
              className="upload-button"
              onClick={() =>
                showVillageRecords(talukaRawDetails[index]["taluka_code"])
              }
            >
              <span className="mr-1">
                <EyeOutlined /> View Village Records
              </span>{" "}
            </Button>
          ),
        });
      }
      settotalCount(reportDetails.length);

      let allTableRecordsNew = { ...allTableRecords };
      allTableRecordsNew["taluka"] = reportDetails;
      setallTableRecords(allTableRecordsNew);
      settableData(reportDetails);
    }
  }, [talukaWiseReportsSelector]);

  // -------- village records ----------
  function showVillageRecords(talukaCode) {
    setcolumns(villageColumns);
    dispatch(
      getVillageMapTypeList({
        URL: URLS.GET_VILLAGE_WISE_COMPLETED_FILES + talukaCode + "/",
      })
    );
  }

  const villageWiseReportsSelector = useSelector(
    (state) => state.villageWiseRecords
  );

  useEffect(() => {
    if (villageWiseReportsSelector) {
      let historyButtonsNew = [...historyButtons];

      historyButtonsNew.push(
        <Button
          type="primary"
          onClick={managePrevNextRecordTables2}
          className="upload-button"
        >
          Taluka Records
        </Button>
      );

      sethistoryButtons(historyButtonsNew);
      setReportsDividerTitle("Village Wise Cumulative Report");

      const villageRawDetails = villageWiseReportsSelector.counts_by_village;

      let villageRawDetailsNew = [];

      for (let index = 0; index < villageRawDetails.length; index++) {
        villageRawDetailsNew.push({
          ...villageRawDetails[index],
          villageMapTypeDetails: (
            <Button
              type="primary"
              className="upload-button"
              onClick={() =>
                showVillageMapTypeRecords(
                  villageRawDetails[index]["village_code"]
                )
              }
            >
              <span className="mr-1">
                <EyeOutlined /> View Map Records
              </span>{" "}
            </Button>
          ),
        });
      }

      settableData(villageRawDetailsNew);
      settotalCount(villageRawDetailsNew.length);

      let allTableRecordsNew = { ...allTableRecords };
      allTableRecordsNew["village"] = villageRawDetailsNew;
      setallTableRecords(allTableRecordsNew);
    }
  }, [villageWiseReportsSelector]);

  //------------- Village Wise Map Type ---------------
  function showVillageMapTypeRecords(villageCode) {
    setcolumns(villageMapTypeColumns);
    dispatch(
      getVillageTypeList({
        URL: URLS.GET_VILLAGE_WISE_MAP_TYPE_COUNT + villageCode + "/",
      })
    );
  }

  const villageMapTypeReportsSelector = useSelector(
    (state) => state.villageWiseMapTypeCount
  );

  useEffect(() => {
    if (villageMapTypeReportsSelector) {
      let villageWiseMapTypeDetails =
        villageMapTypeReportsSelector?.counts_by_maptype;

      let historyButtonsNew = [...historyButtons];
      historyButtonsNew.push(
        <Button
          type="primary"
          className="upload-button"
          onClick={managePrevNextRecordTables3}
        >
          Village Records
        </Button>
      );

      sethistoryButtons(historyButtonsNew);
      setReportsDividerTitle("Village wise Map type Count");

      settableData(villageWiseMapTypeDetails);
      settotalCount(villageWiseMapTypeDetails.length);
    }
  }, [villageMapTypeReportsSelector]);

  //------------- History --------------

  function managePrevNextRecordTables1() {
    setReportsDividerTitle("District Wise Cumulative Report");
    let hisButtons = [];
    sethistoryButtons(hisButtons);
    setcolumns(districtColumns);
    let tableData = allTableRecords["district"];
    settotalCount(tableData.length);
    settableData(tableData);
  }

  function managePrevNextRecordTables2() {
    setReportsDividerTitle("Taluka Wise Cumulative Report");
    let hisButtons = [...historyButtons];
    historyButtons.pop(hisButtons);
    sethistoryButtons(hisButtons);
    setcolumns(talukaColumns);

    let tableData = allTableRecords["taluka"];
    settotalCount(tableData.length);
    settableData(tableData);
  }

  function managePrevNextRecordTables3() {
    setReportsDividerTitle("Village wise Map type Count");

    let hisButtons = [...historyButtons];
    historyButtons.pop(hisButtons);
    sethistoryButtons(hisButtons);
    setcolumns(villageColumns);

    let tableData = allTableRecords["village"];
    settotalCount(tableData.length);
    settableData(tableData);
  }

  // ----------- pdf download ----------
  const callGeneratePDF = () => {
    const tableHeaders = Object.values(columns);
    let tableHeadersNew = [];
    let tableHeadersNames = [];

    let pdfTablelength = 0;

    if (historyButtons.length === 3) {
      pdfTablelength = tableHeaders.length;
    } else {
      pdfTablelength = tableHeaders.length - 1;
    }

    for (let index = 0; index < pdfTablelength; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    let tableDetails = [];

    let totals = new Array(tableHeadersNew.length).fill(0);

    for (let index = 0; index < tableData.length; index++) {
      let row = [];

      for (let r = 0; r < tableHeadersNew.length; r++) {
        const value = tableData[index][tableHeadersNew[r]];
        row.push(value);

        if (!isNaN(value)) {
          totals[r] += parseFloat(value);
        }
      }

      tableDetails.push(row);
    }

    totals[0] = "Total";
    tableDetails.push(totals);

    // Generate PDF
    generatePDF(
      reportsDividerTitle,
      reportsDividerTitle,
      tableHeadersNames,
      tableDetails
    );
  };

  // ----------- excel----------
  function handleDownloadExcelColumns() {
    const tableHeaders = Object.values(columns);
    let tableHeadersNames = [];

    let pdfTablelength = 0;

    if (historyButtons.length === 3) {
      pdfTablelength = tableHeaders.length;
    } else {
      pdfTablelength = tableHeaders.length - 1;
    }

    for (let index = 0; index < pdfTablelength; index++) {
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    return tableHeadersNames;
  }

  function handleDownloadExcelData() {
    const tableHeaders = Object.values(columns);
    let tableHeadersNew = [];
    let pdfTablelength = 0;

    if (historyButtons.length === 3) {
      pdfTablelength = tableHeaders.length;
    } else {
      pdfTablelength = tableHeaders.length - 1;
    }

    for (let index = 0; index < pdfTablelength; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
    }

    let tableDetails = [];
    for (let index = 0; index < tableData.length; index++) {
      let row = [];
      for (let r = 0; r < tableHeadersNew.length; r++) {
        row.push(tableData[index][tableHeadersNew[r]]);
      }
      tableDetails.push(row);
    }

    return tableDetails;
  }

  const total_scan = getTotalCount(tableData, "total_scan_uploaded_count");
  const total_rectify = getTotalCount(tableData, "rectify_completed_count");
  const total_digitize = getTotalCount(tableData, "digitize_completed_count");
  const total_qc = getTotalCount(tableData, "qc_completed_count");
  const total_pdf = getTotalCount(tableData, "pdf_completed_count");

  const totalSummaryRow = {
    district_name: "Total",
    total_scan_uploaded_count: total_scan,
    rectify_completed_count: total_rectify,
    digitize_completed_count: total_digitize,
    qc_completed_count: total_qc,
    pdf_completed_count: total_pdf,
  };

  return (
    <div>
      <Divider orientation="left">District Wise Report</Divider>

      
      <div className="flex flex-wrap  gap-2">
        {historyButtons.length > 0 && (
          <>
            <Space wrap>{historyButtons}</Space>
          </>
        )}
        <Button
          type="dashed"
          onClick={callGeneratePDF}
          className="download-button ml-auto"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> PDF
          </span>
        </Button>

        <Button type="dashed" className="download-button">
          <CSVLink
            filename={"District_Wise_Completed_Files"}
            data={handleDownloadExcelData()}
            headers={handleDownloadExcelColumns()}
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
        dataSource={[...tableData, totalSummaryRow]}
        pagination={false}
        scroll={{ ...setTableHeight(), x: 2000 }}
      />
      <div style={{ marginTop: "10px", display: "flex", alignItems: "end" }}>
        Total {totalCount}
      </div>
    </div>
  );
};

export default Reports;
