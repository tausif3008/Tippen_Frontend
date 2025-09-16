import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import { useOutletContext } from "react-router";
import {
  getDistTalPreScanListAction,
  getPostPreScanListAction,
} from "../../../store/Actions/BaseAction";
import { useSelector } from "react-redux";
import CommonTable from "../../CommonComponents/CommonTable";
import { Divider, Button, Pagination } from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import PreScanSearchForm from "./PreScanSearchForm";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import { canShowStaticTableColumn } from "../../../globals/healpers";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

export const PreScanningDocumentContext = createContext();

const prescaningDocumentReducer = (state, action) => {
  switch (action.type) {
    case "set_prescaning_table_details": {
      return {
        ...state,
        prescaningDocumentList: action["data"],
      };
    }

    case "set_district_taluka_table_details": {
      return {
        ...state,
        distTalukaPrescanningtableDetails: action.data,
      };
    }

    case "set_is_main": {
      return {
        ...state,
        isMain: action.data,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  prescaningDocumentList: {
    data: [],
    totalTableItems: 0,
    DividerTitle: "Prescaning Document List",
    columns: [
      {
        title: "District",
        dataIndex: "district_name",
        key: "district_name",
      },
      {
        title: "Number Of Taluka",
        dataIndex: "no_of_taluka_center",
        key: "no_of_taluka_center",
      },
      {
        title: "Document Received",
        dataIndex: "doc_received_count",
        key: "doc_received_count",
      },
      {
        title: "Document Rejected",
        dataIndex: "document_rejected_total",
        key: "document_rejected_total",
      },
      {
        title: "Pre Scanning",
        dataIndex: "pre_scanning_count",
        key: "pre_scanning_count",
      },
      {
        title: "Scanning Completed",
        dataIndex: "scanning_complete_count",
        key: "scanning_complete_count",
      },
      {
        title: "Rescanning",
        dataIndex: "rescanning_count",
        key: "rescanning_count",
      },
      {
        title: "Document Return",
        dataIndex: "document_return",
        key: "document_return",
      },
      {
        title: "Taluka Wise List",
        dataIndex: "district_wise_document_list",
        key: "district_wise_document_list",
        fixed: canShowStaticTableColumn() ? "right" : "",
      },
    ],
  },
  distTalukaPrescanningtableDetails: {
    data: [],
    totalTableItems: 0,
    DividerTitle: "District Wise Prescan Document List",
    columns: [
      {
        title: "District Name",
        dataIndex: "district_name",
        key: "district_name",
      },
      {
        title: "Taluka Name",
        dataIndex: "taluka_name",
        key: "taluka_name",
      },
      {
        title: "Pre Scanning Count",
        dataIndex: "pre_scanning_count",
        key: "pre_scanning_count",
      },
      {
        title: "Scanning Complete Count",
        dataIndex: "scanning_complete_count",
        key: "scanning_complete_count",
      },
      {
        title: "Rescanning Count",
        dataIndex: "rescanning_count",
        key: "rescanning_count",
      },
      {
        title: "Number of People Present",
        dataIndex: "number_of_people_present",
        key: "number_of_people_present",
      },
      {
        title: "Mis Date",
        dataIndex: "mis_date",
        key: "mis_date",
      },
      {
        title: "Document Return",
        dataIndex: "document_return",
        key: "document_return_total",
      },
      {
        title: "Map Type Code",
        dataIndex: "map_type_code",
        key: "map_type_code",
      },
      {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
      },
    ],
  },
  isMain: true,
};

export default function PreScanDocumentList() {
  const [prescanningState, prescanningStateDispatcher] = useReducer(
    prescaningDocumentReducer,
    initialState
  );

  const setPrescannigDocuementList = (data) => {
    prescanningStateDispatcher({ type: "set_prescaning_table_details", data });
  };

  const setDistTalukaPrescanningList = (data) => {
    prescanningStateDispatcher({
      type: "set_district_taluka_table_details",
      data,
    });
  };

  const getPrescanningDocumentList = () => {
    return prescanningState.prescaningDocumentList;
  };

  const getdistTalukaPrescanningtableDetails = () => {
    return prescanningState.distTalukaPrescanningtableDetails;
  };

  const setIsMain = (data) => {
    prescanningStateDispatcher({
      type: "set_is_main",
      data,
    });
  };

  const getIsMain = () => {
    return prescanningState.isMain;
  };

  return (
    <PreScanningDocumentContext.Provider
      value={{
        setPrescannigDocuementList,
        setDistTalukaPrescanningList,
        getPrescanningDocumentList,
        getdistTalukaPrescanningtableDetails,
        setIsMain,
        getIsMain,
      }}
    >
      <SubPreScanDocumentList></SubPreScanDocumentList>
    </PreScanningDocumentContext.Provider>
  );
}

const SubPreScanDocumentList = () => {
  const { onShowSizeChange } = useOutletContext();

  const {
    setPrescannigDocuementList,
    getPrescanningDocumentList,
    setDistTalukaPrescanningList,
    getdistTalukaPrescanningtableDetails,
    setIsMain,
    getIsMain,
  } = useContext(PreScanningDocumentContext);

  let prescanningData = getIsMain()
    ? getPrescanningDocumentList()
    : getdistTalukaPrescanningtableDetails();

  const { dispatch } = useOutletContext();
  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  useEffect(() => {
    dispatch(getPostPreScanListAction());
  }, []);

  const preScanDocumentListResultSelector = useSelector(
    (state) => state.preScanDocumentListResult
  );

  useEffect(() => {
    if (preScanDocumentListResultSelector?.counts_by_district_prescan) {
      districtWisePreScanningList();
    }
  }, [preScanDocumentListResultSelector]);

  // change pagination Action
  const paginationSelector = useSelector(
    (state) => state.changePaginationActionResult
  );

  // ---------- Searching Section -----------
  const [searchingParameters, setSearchingParameters] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [total, setTotal] = useState(0);

  function paginationPageChange(page, pageSize) {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    prescanningDocumentList(districtCode, page, searchingParameters);
  }

  function prescanningDocumentList(
    district_code,
    pagePram,
    searchingParameters = ""
  ) {
    setDistrictCode(district_code);
    dispatch(
      getDistTalPreScanListAction({
        district_code,
        searchingParameters,
        page: pagePram,
      })
    );
  }

  useEffect(() => {
    if (searchingParameters) {
      prescanningDocumentList(districtCode, null, searchingParameters);
    }
  }, [searchingParameters, districtCode]);

  useEffect(() => {
    if (!getIsMain() && paginationSelector) {
      prescanningDocumentList(districtCode, null, searchingParameters);
    }
  }, [paginationSelector]);

  function districtWisePreScanningList() {
    if (preScanDocumentListResultSelector?.counts_by_district_prescan) {
      let data = preScanDocumentListResultSelector.counts_by_district_prescan;
      let details = [];
      for (const element of data) {
        details.push({
          ...element,
          district_wise_document_list: (
            <Button
              type="primary"
              className="upload-button flex align-content-center"
              onClick={() => {
                prescanningDocumentList(element.disctrict_code, 1);
                setSelectedDistrictName(element.district_name);
                setIsMain(false);
              }}
            >
              <span className="mr-1">
                <EyeOutlined /> View
              </span>{" "}
            </Button>
          ),
        });
      }

      setPrescannigDocuementList({
        ...prescanningData,
        data: details,
        totalTableItems: details.length,
        DividerTitle: "Pre scanning Document List",
      });
    }
  }

  const distTalukaPreScanDocumentListResultSelector = useSelector(
    (state) => state.distTalukaPreScanDocumentListResult
  );

  useEffect(() => {
    if (distTalukaPreScanDocumentListResultSelector?.results) {
      let data = [];
      for (const element of distTalukaPreScanDocumentListResultSelector.results) {
        data.push({
          ...element,
          map_type_code: element.map_type_code.join(", "),
        });

        setTotal(distTalukaPreScanDocumentListResultSelector.count);
        setCurrentPageSize(
          distTalukaPreScanDocumentListResultSelector.per_page_count
        );
      }

      setDistTalukaPrescanningList({
        ...getdistTalukaPrescanningtableDetails(),
        totalTableItems: data.length,
        data: data,
      });
    }
  }, [distTalukaPreScanDocumentListResultSelector]);

  const callGeneratePDF = (selectedDistrictName) => {
    const tableHeaders = Object.values(prescanningData.columns);
    let tableHeadersNew = [];
    let tableHeadersNames = [];

    let pdfTablelength = tableHeaders.length;

    for (let index = 0; index < pdfTablelength - 1; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    let tableDetails = [];
    for (let index = 0; index < prescanningData.data.length; index++) {
      let row = [];

      for (let r = 0; r < tableHeadersNew.length; r++) {
        const value = prescanningData.data[index][tableHeadersNew[r]];
        row.push(value);
      }

      tableDetails.push(row);
    }

    let title =
      prescanningData.DividerTitle +
      " (" +
      " District:" +
      selectedDistrictName +
      " )";
    let finalTitle = getIsMain() ? prescanningData.DividerTitle : title;
    generatePDF(finalTitle, finalTitle, tableHeadersNames, tableDetails);
  };

  return (
    <>
      <Divider orientation="left">{prescanningData?.DividerTitle}</Divider>
      {!getIsMain() ? (
        <>
          <PreScanSearchForm
            getSearchParameters={setSearchingParameters}
          ></PreScanSearchForm>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="primary"
              className="upload-button "
              onClick={() => {
                setSearchingParameters("");
                setIsMain(true);
              }}
            >
              <span>
                <ArrowLeftOutlined /> Pre scan Document List
              </span>{" "}
            </Button>
            <Button
              style={{ marginRight: "10px" }}
              type="dashed"
              className="download-button"
              onClick={() => callGeneratePDF(selectedDistrictName)}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> PDF
              </span>
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="dashed"
            onClick={() => callGeneratePDF(selectedDistrictName)}
            className="download-button"
          >
            <span>
              <DownloadOutlined></DownloadOutlined> PDF
            </span>
          </Button>
        </div>
      )}
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <CommonTable
        columns={prescanningData.columns}
        dataSourse={prescanningData?.data}
        total={prescanningData?.totalTableItems}
        showTotal={getIsMain()}
        scrole={{ x: 1500 }}
      ></CommonTable>
      {!getIsMain() && (
        <Pagination
          onShowSizeChange={(current, pageSize) =>
            onShowSizeChange(current, pageSize)
          }
          showQuickJumpers
          showSizeChanger
          showPage
          total={total}
          current={currentPage}
          pageSize={currentPageSize}
          showTotal={(total) => `Total ${total}`}
          onChange={paginationPageChange}
          style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
        />
      )}
    </>
  );
};
