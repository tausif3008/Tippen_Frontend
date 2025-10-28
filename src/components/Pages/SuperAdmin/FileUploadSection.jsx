import React from "react";
import { Tabs } from "antd";
import FileAllocation from "./FileAllocation";
import DigitizeFileAllocation from "./DigitizeFileAllocation";
import QcFileUploadSuperAdmin from "./QcFileUploadSuperAdmin";
import GovtQcFilesAssignDistAdmin from "./GovtQcFilesAssignDistAdmin";
import TopologyFilesAssignDistAdmin from "./TopologyFilesAssignDistAdmin";
import ShapeFileAllocation from "./ShapeFileAllocation";

const onChange = (key) => {};

const items = [
  // {
  //   key: "rectify",
  //   label: "Rectify",
  //   children: <FileAllocation></FileAllocation>,
  // },
  {
    key: "digitize",
    label: "Digitize",
    children: <DigitizeFileAllocation></DigitizeFileAllocation>,
  },
  {
    key: "qc",
    label: "QC",
    children: <QcFileUploadSuperAdmin></QcFileUploadSuperAdmin>,
  },
  {
    key: "govt_qc",
    label: "Govt QC",
    children: <GovtQcFilesAssignDistAdmin></GovtQcFilesAssignDistAdmin>,
  },
  // {
  //   key: "topology",
  //   label: "Topology",
  //   children: <TopologyFilesAssignDistAdmin></TopologyFilesAssignDistAdmin>,
  // },
  // {
  //   key: "shape",
  //   label: "Shape",
  //   children: <ShapeFileAllocation></ShapeFileAllocation>,
  // },
];

const FileUploadSection = () => {
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

export default FileUploadSection;
