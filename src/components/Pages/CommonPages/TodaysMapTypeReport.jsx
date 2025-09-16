import { Button, Space, Divider } from "antd";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import CommonTable from "../../CommonComponents/CommonTable";
import { useOutletContext } from "react-router-dom";
import { getTodaysMapTypeReportAction } from "../../../store/Actions/BaseAction";
import { useSelector } from "react-redux";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import MarginContainer from "./MarginContainer";
import { DownloadOutlined } from "@ant-design/icons";

const TodaysMapTypeContext = createContext();

const todaysMapTypeReducer = (state, action) => {
  switch (action.type) {
    case "set_todays_map_type_report": {
      return {
        ...state,
        todaysReportList: action["data"],
      };
    }

    default:
      return state;
  }
};

const initialState = {
  todaysReportList: [],
};

const TodaysMapTypeReport = () => {
  const [todaysMapTypeState, todaysMapTypeStateDispatcher] = useReducer(
    todaysMapTypeReducer,
    initialState
  );

  function setTodaysMapTypeList(data) {
    todaysMapTypeStateDispatcher({
      type: "set_todays_map_type_report",
      data,
    });
  }

  function getTodaysMapTypeReportList() {
    return todaysMapTypeState.todaysReportList;
  }

  return (
    <TodaysMapTypeContext.Provider
      value={{ setTodaysMapTypeList, getTodaysMapTypeReportList }}
    >
      <GetTodaysMapTypeReport></GetTodaysMapTypeReport>
    </TodaysMapTypeContext.Provider>
  );
};

const GetTodaysMapTypeReport = () => {
  const { dispatch } = useOutletContext();
  const { setTodaysMapTypeList, getTodaysMapTypeReportList } =
    useContext(TodaysMapTypeContext);

  const todaysMapTypeReportListSelector = useSelector(
    (state) => state.todaysMapTypeReportList
  );

  useEffect(() => {
    if (!todaysMapTypeReportListSelector)
      dispatch(getTodaysMapTypeReportAction());
  }, []);

  useEffect(() => {
    if (todaysMapTypeReportListSelector?.counts_by_maptype) {
      let data = todaysMapTypeReportListSelector.counts_by_maptype;
      setTodaysMapTypeList(data);
    }
  }, [todaysMapTypeReportListSelector]);

  const columns = [
    { title: "Map Code", dataIndex: "map_code", key: "map_code" },
    {
      title: "Map Name English",
      dataIndex: "mapname_english",
      key: "mapname_english",
      width: 250,
    },
    {
      title: "Scan Uploaded",
      dataIndex: "scan_uploaded",
      key: "scan_uploaded",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed",
      key: "rectify_completed",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed",
      key: "digitize_completed",
      width: 160,
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed",
      key: "qc_completed",
    },
  ];

  const callGeneratePDF = () => {
    const tableHeaders = Object.values(columns);
    let tableHeadersNew = [];
    let tableHeadersNames = [];

    let pdfTablelength = tableHeaders.length;

    for (let index = 0; index < pdfTablelength; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    let tableDetails = [];

    let totals = new Array(tableHeadersNew.length).fill(0);

    for (let index = 0; index < getTodaysMapTypeReportList().length; index++) {
      let row = [];

      for (let r = 0; r < tableHeadersNew.length; r++) {
        const value = getTodaysMapTypeReportList()[index][tableHeadersNew[r]];
        row.push(value);

        if (!isNaN(value)) {
          totals[r] += parseFloat(value);
        }
      }

      tableDetails.push(row);
    }

    // Generate PDF
    generatePDF(
      "Map Type Report",
      "Map Type Report",
      tableHeadersNames,
      tableDetails
    );
  };

  return (
    <div>
      <Divider orientation="left">Todays Map Type Report</Divider>
      <div className="flex flex-wrap justify-end">
        <Button
          type="dashed"
          onClick={callGeneratePDF}
          className="download-button"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> PDF
          </span>
        </Button>
      </div>
      <MarginContainer marginBottom="10px"></MarginContainer>
      <CommonTable
        columns={columns}
        dataSourse={getTodaysMapTypeReportList()}
        total={getTodaysMapTypeReportList().length}
        showTotal={true}
        scrole={{ x: 1050 }}
      ></CommonTable>
    </div>
  );
};

export default TodaysMapTypeReport;
