import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useOutletContext } from "react-router";
import {
  getPreDraftDistrictListAction,
  preDraftDocumentListAction,
  setPaginationCountChangeFalse,
} from "../../../store/Actions/BaseAction";
import { useSelector } from "react-redux";
import CommonTable from "../../CommonComponents/CommonTable";
import { Divider, Button, Modal, Pagination } from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CreatePreDraftingReportForm from "./Forms/CreatePreDraftingReportForm";
import { generatePDF } from "../../../utils/downloadPDFAndExcel";
import PreDraftSearchForm from "./PreDraftSearchForm";
import { canShowStaticTableColumn } from "../../../globals/healpers";
import MarginContainer from "./../CommonPages/MarginContainer";

export const PreDraftDocumentContext = createContext();

const preDraftDocumentReducer = (state, action) => {
  switch (action.type) {
    case "set_pre_draft_table_details": {
      return {
        ...state,
        preDraftDocumentList: action["data"],
      };
    }

    case "set_district_taluka_table_details": {
      return {
        ...state,
        distTalukaPreDrafttableDetails: action.data,
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
  preDraftDocumentList: {
    data: [],
    totalTableItems: 0,
    DividerTitle: "District Wise Pre Draft Document List",
    columns: [
      {
        title: "District",
        dataIndex: "district_name",
        key: "district_name",
      },
      {
        title: "District Code",
        dataIndex: "disctrict_code",
        key: "disctrict_code",
      },
      {
        title: "Correction Uploading Map Count",
        dataIndex: "correction_uploading_map_count",
        key: "correction_uploading_map_count",
      },
      {
        title: "Drafting Map Count",
        dataIndex: "drafting_map_count",
        key: "drafting_map_count",
      },
      {
        title: "District Wise Document List",
        dataIndex: "district_wise_document_list",
        key: "district_wise_document_list",
        fixed: canShowStaticTableColumn() ? "right" : "",
      },
    ],
  },
  distTalukaPreDrafttableDetails: {
    data: [],
    totalTableItems: 0,
    DividerTitle: "Pre Draft Document List",
    columns: [
      {
        title: "District Name",
        dataIndex: "district_name",
        key: "district_name",
      },
      {
        title: "Taluks Name",
        dataIndex: "taluka_name",
        key: "taluka_name",
      },

      {
        title: "Drafting Map Count",
        dataIndex: "drafting_map_count",
        key: "drafting_map_count",
      },
      {
        title: "Correction Uploading Map Count",
        dataIndex: "correction_uploading_map_count",
        key: "correction_uploading_map_count",
      },
      {
        title: "Pre Drafting Date",
        dataIndex: "pre_drafting_date",
        key: "pre_drafting_date",
      },
      {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
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

export default function PreDraftList() {
  const [preDraftState, preDraftStateDispatcher] = useReducer(
    preDraftDocumentReducer,
    initialState
  );

  const setPreDraftDocuementList = useCallback((data) => {
    preDraftStateDispatcher({ type: "set_pre_draft_table_details", data });
  }, []);

  const setDistTalukaDraftList = useCallback((data) => {
    preDraftStateDispatcher({
      type: "set_district_taluka_table_details",
      data,
    });
  }, []);

  const getPreDraftDocumentList = useCallback(() => {
    return preDraftState.preDraftDocumentList;
  }, [preDraftState.preDraftDocumentList]);

  const getdistTalukaPreDraftTableDetails = useCallback(() => {
    return preDraftState.distTalukaPreDrafttableDetails;
  }, [preDraftState.distTalukaPreDrafttableDetails]);

  const setIsMain = useCallback((data) => {
    preDraftStateDispatcher({
      type: "set_is_main",
      data,
    });
  }, []);

  const getIsMain = useCallback(() => {
    return preDraftState.isMain;
  }, [preDraftState.isMain]);

  let contextValues = useMemo(() => {
    return {
      setPreDraftDocuementList,
      setDistTalukaDraftList,
      getPreDraftDocumentList,
      getdistTalukaPreDraftTableDetails,
      setIsMain,
      getIsMain,
    };
  }, [
    setPreDraftDocuementList,
    setDistTalukaDraftList,
    getPreDraftDocumentList,
    getdistTalukaPreDraftTableDetails,
    setIsMain,
    getIsMain,
  ]);

  return (
    <PreDraftDocumentContext.Provider value={contextValues}>
      <SubPreDraftDocumentList></SubPreDraftDocumentList>
    </PreDraftDocumentContext.Provider>
  );
}

const SubPreDraftDocumentList = () => {
  const { onShowSizeChange } = useOutletContext();
  const {
    setPreDraftDocuementList,
    getPreDraftDocumentList,
    setDistTalukaDraftList,
    getdistTalukaPreDraftTableDetails,
    setIsMain,
    getIsMain,
  } = useContext(PreDraftDocumentContext);

  let preDraftData = getIsMain()
    ? getPreDraftDocumentList()
    : getdistTalukaPreDraftTableDetails();

  const { dispatch } = useOutletContext();
  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  useEffect(() => {
    dispatch(preDraftDocumentListAction());
  }, []);

  const preDraftDocumentListSelector = useSelector(
    (state) => state.preDraftDistrictDocumentListResult
  );

  const callGeneratePDF = (selectedDistrictName) => {
    const tableHeaders = Object.values(preDraftData.columns);
    let tableHeadersNew = [];
    let tableHeadersNames = [];

    let pdfTablelength = tableHeaders.length;

    for (let index = 0; index < pdfTablelength - 1; index++) {
      tableHeadersNew.push(tableHeaders[index]["dataIndex"]);
      tableHeadersNames.push(tableHeaders[index]["title"]);
    }

    let tableDetails = [];
    for (let index = 0; index < preDraftData.data.length; index++) {
      let row = [];

      for (let r = 0; r < tableHeadersNew.length; r++) {
        const value = preDraftData.data[index][tableHeadersNew[r]];
        row.push(value);
      }

      tableDetails.push(row);
    }

    let title =
      preDraftData.DividerTitle +
      " (" +
      " District:" +
      selectedDistrictName +
      " )";
    let finalTitle = getIsMain() ? preDraftData.DividerTitle : title;
    generatePDF(finalTitle, finalTitle, tableHeadersNames, tableDetails);
  };

  const [districtCode, setDistrictCode] = useState("");

  function preDraftDocumentList() {
    if (preDraftDocumentListSelector?.counts_by_district_predraft) {
      let details = [];
      for (const element of preDraftDocumentListSelector.counts_by_district_predraft) {
        details.push({
          ...element,
          district_wise_document_list: (
            <Button
              type="primary"
              className="upload-button"
              onClick={() => {
                preDraftDocumentDistrictList(element.disctrict_code);

                setSelectedDistrictName(element.district_name);
                setIsMain(false);
              }}
            >
              <span className="mr-1">
                <EyeOutlined /> View
              </span>
            </Button>
          ),
        });
      }

      setPreDraftDocuementList({
        ...preDraftData,
        data: details,
        totalTableItems: details.length,
        DividerTitle: "Pre Draft District Document List",
      });
    }
  }

  useEffect(() => {
    if (preDraftDocumentListSelector?.counts_by_district_predraft) {
      preDraftDocumentList();
    }
  }, [preDraftDocumentListSelector]);

  function preDraftDocumentDistrictList(
    district_code,
    page,
    searchingParameters = ""
  ) {
    dispatch(
      getPreDraftDistrictListAction({
        district_code,
        page,
        searchingParameters,
      })
    );
    setDistrictCode(district_code);
  }

  const distTalukaPreDraftDocumentListResultSelector = useSelector(
    (state) => state.preDraftDocumentListResult
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setSetCurrentPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (distTalukaPreDraftDocumentListResultSelector?.results) {
      let data = [];
      for (const element of distTalukaPreDraftDocumentListResultSelector.results) {
        data.push({
          ...element,
          map_type_code: element.map_type_code.join(", "),
        });
      }

      setDistTalukaDraftList({
        ...getdistTalukaPreDraftTableDetails(),
        totalTableItems: data.length,
        data: data,
      });
    }

    setTotal(distTalukaPreDraftDocumentListResultSelector?.count);
    setSetCurrentPageSize(
      distTalukaPreDraftDocumentListResultSelector?.per_page_count
    );
  }, [distTalukaPreDraftDocumentListResultSelector]);
  const [open, setOpen] = useState(false);
  const [searchingParameters, setSearchingParameters] = useState("");

  useEffect(() => {
    if (searchingParameters) {
      preDraftDocumentDistrictList(districtCode, null, searchingParameters);
    }
  }, [searchingParameters, districtCode]);

  function paginationPageChange(page, pageSize) {
    setCurrentPage(page);
    setSetCurrentPageSize(pageSize);
    preDraftDocumentDistrictList(districtCode, page, searchingParameters);
  }

  const paginationSelector = useSelector(
    (state) => state.changePaginationActionResult
  );
  useEffect(() => {
    if (!getIsMain() && paginationSelector) {
      dispatch(setPaginationCountChangeFalse());
      preDraftDocumentDistrictList(districtCode, null, searchingParameters);
    }
  }, [paginationSelector]);

  return (
    <div>
      <Divider orientation="left">{preDraftData?.DividerTitle}</Divider>
      <div>
        {!getIsMain() && (
          <PreDraftSearchForm
            getSearchParameters={setSearchingParameters}
          ></PreDraftSearchForm>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {!getIsMain() ? (
          <div style={{ alignSelf: "start" }}>
            <Button
              type="primary"
              className="upload-button"
              onClick={() => setIsMain(true)}
            >
              <span>
                <ArrowLeftOutlined /> Pre Draft Document List
              </span>
            </Button>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginLeft: "auto" }} className="flex gap-2 flex-wrap">
          <Button
            type="dashed"
            className="download-button"
            onClick={() => callGeneratePDF(selectedDistrictName)}
          >
            <span>
              <DownloadOutlined></DownloadOutlined> PDF
            </span>
          </Button>
          <Button
            type="dashed"
            className="create-button"
            onClick={() => setOpen(true)}
          >
            <span>
              <PlusOutlined></PlusOutlined>
            </span>{" "}
          </Button>
        </div>
      </div>
      <MarginContainer marginBottom="10px"></MarginContainer>
      <Modal
        open={open}
        style={{ top: 50, bottom: 50 }}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <CreatePreDraftingReportForm
          setOpen={setOpen}
        ></CreatePreDraftingReportForm>
      </Modal>

      {!getIsMain() ? (
        <p
          style={{
            fontSize: "18px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          District: {selectedDistrictName}
        </p>
      ) : (
        ""
      )}

      <CommonTable
        columns={preDraftData.columns}
        dataSourse={preDraftData?.data}
        total={preDraftData?.totalTableItems}
        showTotal={getIsMain()}
        scrole={{ x: 1300 }}
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
          pageSize={currentPageSize ? currentPageSize : 10}
          showTotal={(total) => `Total ${total}`}
          onChange={paginationPageChange}
          style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
        />
      )}
    </div>
  );
};
