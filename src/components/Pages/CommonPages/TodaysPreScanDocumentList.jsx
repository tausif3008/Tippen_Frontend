import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useOutletContext } from "react-router-dom";
import {
  getPreScanDocumentListRowSpan,
  setLoadingFalse,
} from "../../../store/Actions/BaseAction";
import { useSelector } from "react-redux";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import "./RowSpanTable.scss";
import { DownloadOutlined } from "@ant-design/icons";
import MarginContainer from "./MarginContainer";
import CommonDivider from "./../../CommonComponents/CommonDivider";
import {
  getTablePDF,
  preScanDrafTableFinalSourcefinalRes,
  setTableHeight,
} from "../../../globals/healpers";
import PreScanDraftSearchForm from "./PreScanDraftSearchForm";
import CommonTable from "../../CommonComponents/CommonTable";
import "./TodaysPreScanDocumentList.scss";

const TodaysPreScanDocumentList = () => {
  const { dispatch } = useOutletContext();

  const selector = useSelector((state) => state.todaysPreScanDocumentList);

  useEffect(() => {
    if (!selector) {
      dispatch(getPreScanDocumentListRowSpan(""));
    }
  }, []);

  useEffect(() => {
    if (selector) {
      getData(selector);
    }
  }, [selector]);

  const callGeneratePDF = (id) => {
    generatePDF(
      "Todays pre-scan document list",
      "Todays_pre-scan_document_list",
      "",
      "",
      id
    );
  };

  const [filteredData, setFilteredData] = useState([]);
  const [finalResult, setFinalResult] = useState([]);

  useEffect(() => {
    if (filteredData?.length > 0) {
      tableFinalSource(filteredData);
    }
  }, [filteredData]);

  function getData(data) {
    let result = [];
    for (const el of data) {
      const district = el.district_name;
      const all = el.all[0];

      let allDataList = [
        "All",
        `${all.from_date} - ${all.end_date}`,
        all.scanning_complete_count,
        all.total_day,
        !isNaN(all.scanning_complete_count / all.total_day)
          ? Math.round(all.scanning_complete_count / all.total_day)
          : 0,
      ];

      let allList = [];
      allList.push(allDataList);

      for (const e of el.taluka_name) {
        allList.push([
          e.taluka_name,
          e.mis_date,
          e.scanning_complete_count,
          e.total_day_count,
          !isNaN(e.scanning_complete_count / e.total_day_count)
            ? Math.round(e.scanning_complete_count / e.total_day_count)
            : 0,
        ]);
      }

      result.push({ district, allList, rowSpan: allList.length });
    }

    setFilteredData(result);
  }

  const [canPrint, setCanPrint] = useState(false);

  function getTable(result, id) {
    getTablePDF(result, id);
    setCanPrint(true);
  }

  useEffect(() => {
    if (canPrint) {
      callGeneratePDF(document.querySelector("#myTable"));
      setCanPrint(false);
    }
  }, [canPrint]);

  let tableColumns = [
    {
      title: "District",
      dataIndex: "district",
      onCell: (data) => {
        if (data.rowSpan) {
          return {
            rowSpan: data.rowSpan,
          };
        }

        return {
          rowSpan: 0,
        };
      },
    },
    {
      title: "Taluka",
      dataIndex: "taluka",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Scanning Completed Count",
      dataIndex: "scanning_completed_count",
    },
    {
      title: "Total Days",
      dataIndex: "total_days",
    },
    {
      title: "Average",
      dataIndex: "average",
    },
  ];

  function tableFinalSource(data) {
    dispatch(setLoadingFalse());
    setFinalResult(preScanDrafTableFinalSourcefinalRes(data));
  }

  return (
    <div>
      <CommonDivider title={"Todays pre-scan document list"}></CommonDivider>
      <PreScanDraftSearchForm
        dispatch={dispatch}
        getPreScanDocumentListRowSpann={getPreScanDocumentListRowSpan}
      ></PreScanDraftSearchForm>
      <MarginContainer marginTop="10px"></MarginContainer>
      <div className="flex justify-end">
        <Button
          className="download-button"
          onClick={() => getTable(filteredData, "#table_container_scan")}
        >
          <span>
            <DownloadOutlined></DownloadOutlined> PDF
          </span>
        </Button>
      </div>
      <MarginContainer marginTop="10px"></MarginContainer>
      <div style={{ display: "none" }} id="table_container_scan"></div>
      <CommonTable
        columns={tableColumns}
        dataSourse={finalResult}
        pagination={false}
        showTotal={false}
        scrole={{ ...setTableHeight() }}
      />
    </div>
  );
};

export default TodaysPreScanDocumentList;
