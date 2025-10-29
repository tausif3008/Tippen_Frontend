import React, { useEffect } from "react";
import UserFileSection from "./UserFileSection";
import { Tabs } from "antd";
import DigitizeSection from "./DigitizeSection";
import QCFileUser from "./QCFileUser";
import PDFSection from "./PDFSection";
import GovQCSection from "./GovQCSection";
import GovPDFSection from "./GovPDFSection";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../store/Actions/BaseAction";
import TopologySection from "./TopologySection";
import ShapeSection from "./ShapeSection";

const UserFiles = () => {
  const onChange = (key) => {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selector) dispatch(userProfileAction({}));
  }, []);

  const selector = useSelector((state) => state.userProfileDetails);
  const departments = selector
    ? selector.data.department.map((element) => element.department_name)
    : [];

  const items = [];

  // if (departments.includes("Rectify")) {
  //   items.push({
  //     key: "rectify",
  //     label: "Rectify",
  //     children: <UserFileSection></UserFileSection>,
  //   });
  // }

  if (departments.includes("Digitize")) {
    items.push({
      key: "digitize",
      label: "Tippen Digitize",
      children: <DigitizeSection></DigitizeSection>,
    });
  }

  if (departments.includes("QC")) {
    items.push({
      key: "qc",
      label: "QC",
      children: <QCFileUser></QCFileUser>,
    });

    // items.push({
    //   key: "pdf",
    //   label: "PDF",
    //   children: <PDFSection></PDFSection>,
    // });
  }

  // if (departments.includes("Topology")) {
  //   items.push({
  //     key: "topology",
  //     label: "Topology",
  //     children: <TopologySection></TopologySection>,
  //   });
  // }

  // if (departments.includes("Shape")) {
  //   items.push({
  //     key: "shape",
  //     label: "Shape",
  //     children: <ShapeSection></ShapeSection>,
  //   });
  // }
  
  if (departments.includes("Scan")) {
    items.push({
      key: "gov_qc",
      label: "Gov QC Pending Approval",
      children: <GovQCSection></GovQCSection>,
    });

    items.push({
      key: "gov_pdf",
      label: "Gov PDF Pending Approval",
      children: <GovPDFSection></GovPDFSection>,
    });
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default UserFiles;
