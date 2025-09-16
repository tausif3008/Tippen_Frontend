import React, { useEffect } from "react";
import { Tabs } from "antd";
import DigitizeUserAllocation from "./DigitizeUserAllocation";
import UserFileAllocation from "./UserFileAllocation";
import QcFilesAssignUser from "./QcFilesAssignUser";
import { getDepartmentList } from "../../../store/Actions/BaseAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppConstants } from "../../../globals/AppConstants";
import TopologyUserAllocation from "./TopologyUserAllocation";
import ShapeUserAllocation from "./ShapeUserAllocation";

const AgencyUploadSection = () => {
  const onChange = (key) => {};

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.allDepartmentList);

  useEffect(() => {
    if (!selector) dispatch(getDepartmentList({}));
  }, []);

  const [departmentList, setdepartmentList] = useState(null);

  if (!departmentList && selector) {
    let departmentId = {};
    for (let index = 0; index < selector.data.length; index++) {
      departmentId[selector.data[index]["department_name"]] =
        selector.data[index]["id"];
    }

    setdepartmentList(departmentId);
  }

  useEffect(() => {
    if (selector) {
      let departmentId = {};
      for (let index = 0; index < selector.data.length; index++) {
        departmentId[selector.data[index]["department_name"]] =
          selector.data[index]["id"];
      }

      setdepartmentList(departmentId);
    }
  }, [selector]);

  const items = [
    {
      key: "rectify",
      label: "Rectify",
      children: departmentList && (
        <UserFileAllocation
          departmentId={departmentList[AppConstants.RECTIFY_DEPARTMENT]}
        ></UserFileAllocation>
      ),
    },
    {
      key: "digitize",
      label: "Digitize",
      children: departmentList && (
        <DigitizeUserAllocation
          departmentId={departmentList[AppConstants.DIGITIZE_DEPARTMENT]}
        ></DigitizeUserAllocation>
      ),
    },
    {
      key: "qc",
      label: "QC",
      children: departmentList && (
        <QcFilesAssignUser
          departmentId={departmentList[AppConstants.QC_DEPARTMENT]}
        ></QcFilesAssignUser>
      ),
    },
    {
      key: "topology",
      label: "Topology",
      children: departmentList && (
        <TopologyUserAllocation
          departmentId={departmentList[AppConstants.TOPOLOGY_DEPARTMENT]}
        ></TopologyUserAllocation>
      ),
    },
    {
      key: "shape",
      label: "Shape",
      children: departmentList && (
        <ShapeUserAllocation
          departmentId={departmentList[AppConstants.SHAPE_DEPARTMENT]}
        ></ShapeUserAllocation>
      ),
    },
  ];

  return (
    <>
      {departmentList && (
        <div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            type="card"
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};

export default AgencyUploadSection;
