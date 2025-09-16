import React, { useEffect, useState } from "react";
import { Table, Divider, Avatar, Card } from "antd";
import "./dashboard.scss";
import {
  getDashboardDetailsAction,
  userProfileAction,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import { useDispatch, useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";
import { setTableHeight } from "../../../globals/healpers";
import { getDashboardCards } from "../../../utils/dashbordContent";
import CommonDivider from "../../CommonComponents/CommonDivider";
import { postHTTP } from "../../../Axios/Axios";

const DashboardPage = () => {
  const selectorUserProfile = useSelector((state) => state.userProfileDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectorUserProfile) dispatch(userProfileAction({}));
  }, []);

  const departments = selectorUserProfile
    ? selectorUserProfile.data?.department?.map(
        (element) => element.department_name
      )
    : [];

  const DataList = getDashboardCards(departments);
  const selector = useSelector((state) => state.dashboardDetails);

  const [dataSourse, setdataSourse] = useState([]);
  const [cardContentName, setcardContentName] = useState(null);

  if (selector) {
    for (let index = 0; index < DataList?.length; index++) {
      let count = 0;

      if (DataList[index]["id"] === "totalScan") {
        count = selector["total_scan_uploaded"];
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "totalRectify") {
        // count =
        //   selector["rectify_allocated"] +
        //   selector["rectify_inprocess"] +
        //   selector["rectify_onhold"] +
        //   selector["rectify_completed"] +
        //   selector["rectify_rejected"];
        count = selector["rectify_completed"]; //displaying only completed count
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "totalDigitize") {
        // count =
        //   selector["digitize_allocated"] +
        //   selector["digitize_inprocess"] +
        //   selector["digitize_onhold"] +
        //   selector["digitize_completed"] +
        //   selector["digitize_rejected"];
        count = selector["digitize_completed"]; //displaying only completed count
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "totalQC") {
        // count =
        //   selector["qc_allocated"] +
        //   selector["qc_inprocess"] +
        //   selector["qc_onhold"] +
        //   selector["qc_completed"] +
        //   selector["qc_rejected"];
        count = selector["qc_completed"]; //displaying only completed count
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "totalPdf") {
        DataList[index]["count"] = count;
        count = selector["pdf_completed"];
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "totalPolygon") {
        DataList[index]["count"] = count;
        count = selector["digitize_polygon_count"];
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "belTotalScan") {
        DataList[index]["count"] = count;
        count = selector["bel_scan_uploaded"];
        DataList[index]["count"] = count;
      } else if (DataList[index]["id"] === "belTotalDraft") {
        DataList[index]["count"] = count;
        count = selector["bel_draft_uploaded"];
        DataList[index]["count"] = count;
      }
    }
  }

  useEffect(() => {
    if (!selector) {
      dispatch(
        getDashboardDetailsAction({ URL: URLS.GET_DASHBOARD_COUNT_URL })
      );
    }
  }, []);

  const [headerContent, setheaderContent] = useState([]);

  let headerContent1 = [
    {
      title: "Allocated",
      dataIndex: "allocated",
    },
    {
      title: "Inprocess",
      dataIndex: "inprocess",
    },
    {
      title: "Hold",
      dataIndex: "hold",
    },
    {
      title: "Rejected",
      dataIndex: "rejected",
    },
    {
      title: "Completed",
      dataIndex: "completed",
    },
  ];

  let headerContent2 = [
    {
      title: "Total Scan Uploaded",
      dataIndex: "totalScanUploaded",
    },

    {
      title: "Total Scan Allocation Pending",
      dataIndex: "scanUploaded",
    },
    {
      title: "Total Scan Allocated",
      dataIndex: "scanCompleted",
    },
    {
      title: "Total Not Found",
      dataIndex: "notFound",
    },
  ];

  let headerContent3 = [
    {
      title: "Total Digitize Polygon",
      dataIndex: "digitize_polygon_count",
    },

    {
      title: "Total QC Polygon",
      dataIndex: "qc_polygon_count",
    },
    {
      title: "Total BEL Draft Polygon",
      dataIndex: "bel_draft_qcpolygon_count",
    },
    {
      title: "Total Govt Approved Polygon",
      dataIndex: "bel_draft_approved_qcpolygon_count",
    },
  ];

  const totalScanUploadContent = () => {
    let tableContent = [];

    tableContent.push({
      totalScanUploaded: selector["total_scan_uploaded"],
      scanUploaded: selector["scan_uploaded_count"],
      scanCompleted:
        selector["total_scan_uploaded"] -
        selector["scan_uploaded_count"] -
        selector["not_found_uploaded"],
      notFound: selector["not_found_uploaded"],
    });

    setdataSourse(tableContent);
  };

  const totalRectifyContent = () => {
    let tableContent = [];
    tableContent.push({
      allocated: selector["rectify_allocated"],
      inprocess: selector["rectify_inprocess"],
      hold: selector["rectify_onhold"],
      completed: selector["rectify_completed"],
      rejected: selector["rectify_rejected"],
    });
    setdataSourse(tableContent);
  };

  const totalDigitizeDetails = () => {
    let tableContent = [];
    tableContent.push({
      allocated: selector["digitize_allocated"],
      inprocess: selector["digitize_inprocess"],
      hold: selector["digitize_onhold"],
      completed: selector["digitize_completed"],
      rejected: selector["digitize_rejected"],
    });

    setdataSourse(tableContent);
  };

  const totalQCDetails = () => {
    let tableContent = [];
    tableContent.push({
      allocated: selector["qc_allocated"],
      inprocess: selector["qc_inprocess"],
      hold: selector["qc_onhold"],
      completed: selector["qc_completed"],
      rejected: selector["qc_rejected"],
    });

    setdataSourse(tableContent);
  };

  const totalPDFDetails = () => {
    let tableContent = [];
    tableContent.push({
      allocated: selector["pdf_allocated"],
      inprocess: selector["pdf_inprocess"],
      hold: selector["pdf_onhold"],
      completed: selector["pdf_completed"],
      rejected: selector["pdf_rejected"],
    });
    setdataSourse(tableContent);
  };

  const totalPolygonDetails = () => {
    let tableContent = [];
    tableContent.push({
      digitize_polygon_count: selector["digitize_polygon_count"],
      qc_polygon_count: selector["qc_polygon_count"],
      bel_draft_qcpolygon_count: selector["bel_draft_qcpolygon_count"],
      bel_draft_approved_qcpolygon_count: selector["bel_draft_approved_qcpolygon_count"],
    });
    setdataSourse(tableContent);
  };

  const selectedCardFun = (cardName) => {
    if (cardName === "totalScan") {
      setheaderContent(headerContent2);
    } else if (cardName === "totalPolygon") {
      setheaderContent(headerContent3);
    } else if (cardName === "belTotalScan" || cardName == "belTotalDraft") {
      setcardContentName(null);
    } else {
      setheaderContent(headerContent1);
    }

    if (cardName === "totalScan") {
      if (selector) totalScanUploadContent();
      setcardContentName("Scan Upload Details");
    } else if (cardName === "totalRectify") {
      if (selector) totalRectifyContent();
      setcardContentName("Rectify Details");
    } else if (cardName === "totalDigitize") {
      if (selector) totalDigitizeDetails();
      setcardContentName("Digitize Details");
    } else if (cardName === "totalQC") {
      if (selector) totalQCDetails();
      if (selector) setcardContentName("QC Details");
    } else if (cardName === "totalPdf") {
      if (selector) totalPDFDetails();
      setcardContentName("PDF Details");
    } else if (cardName === "totalPolygon") {
      if (selector) totalPolygonDetails();
      setcardContentName("Polygon Details");
    }
  };

  return (
    <>
      <CommonDivider title={"Dashboard"}></CommonDivider>
      <div className="main-dashboard-container">
        <section>
          <div
            className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2  md:text-base"
            style={{
              marginBottom: "2%",
              marginTop: "2%",
            }}
          >
            {DataList.map(({ id, titleCard, iconn, count }) => (
              <Card
                key={titleCard}
                onClick={() => selectedCardFun(id)}
                id={`card_meta`}
                className={`h-24 card_meta_${id}`}
              >
                <Meta
                  className="lg:text-lg md:text-lg"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-evenly",
                  }}
                  avatar={<Avatar src={iconn} />}
                  title={titleCard}
                  description={<div>{count}</div>}
                />
              </Card>
            ))}
          </div>
        </section>
        <div
          style={{
            marginBottom: "10px",
          }}
        ></div>
        {cardContentName && (
          <div>
            <Divider orientation="left">{cardContentName}</Divider>
            <div className="selected-card-content">
              <Table
                bordered
                colSpan={12}
                pagination={false}
                columns={headerContent}
                dataSource={dataSourse}
                scroll={setTableHeight()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
