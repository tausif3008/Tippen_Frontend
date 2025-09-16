import React, { useEffect, useState } from "react";
import { Divider, Space, Button, message, Select } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { API_CONSTANTS } from "../../../globals/ApiConstants";
import {
  setBelUploadFalse,
  uploadBelExcelFile,
} from "../../../store/Actions/BaseAction";

const BellUploding = () => {
  const props = {
    name: "file",
    multiple: false,
  };

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileList, setfileList] = useState([]);
  const [selectedAction, setSelectedAction] = useState(false);

  const uploadingProgress = ({ file, fileList }) => {
    if (uploaded === true) {
      setUploaded(false);
    }

    setfileList(fileList);

    if (file.status !== "uploading") {
      let formDataList = [];

      for (const element of fileList) {
        formDataList.push(element.originFileObj);
      }
      setFile(formDataList);
    }
  };

  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = () => {
    if (file && selectedAction) {
      if (file.length > 1) {
        message.info("You can upload only one file at once!");
      } else {
        const formData = new FormData();
        file.forEach((element) => {
          formData.append("file", element);
        });

        dispatch(
          uploadBelExcelFile({
            type: API_CONSTANTS.POST_BELL_EXCEL_FILE,
            file: formData,
            statusAction: selectedAction,
          })
        );
      }
    } else {
      message.info("Please Select Action!");
    }
  };

  const belFileUploadSectionSelector = useSelector(
    (state) => state.belFileUploadSection
  );

  useEffect(() => {
    if (belFileUploadSectionSelector) {
      if (belFileUploadSectionSelector.message) {
        message.info(belFileUploadSectionSelector.message);
        dispatch(setBelUploadFalse());
      }
    }
  }, [belFileUploadSectionSelector]);

  return (
    <>
      <Divider orientation="left">Bel Uploading</Divider>
      <div className="flex flex-col gap-3">
        <Select
          optionFilterProp="label"
          style={{ width: "260px" }}
          placeholder="Selecte Actions"
          onChange={(value) => setSelectedAction(value)}
          options={[
            {
              label: "Bel Scan Uploaded",
              value: "bel_scan_uploaded",
            },
            {
              label: "Bel Scan Gov QC Approved",
              value: "bel_gov_scan_qc_approved",
            },
            {
              label: "Bel Draft Uploaded",
              value: "bel_draft_uploaded",
            },

            {
              label: "Bel Draft Gov QC Approved",
              value: "bel_gov_draft_qc_approved",
            },
          ]}
        />

        <Dragger
          {...props}
          percent
          progress
          onChange={uploadingProgress}
          accept={[".csv", ".xlsx", ".xls"]}
          fileList={fileList}
          listType="text"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag folder to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single .csv, .xls or .xlsx
          </p>
        </Dragger>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10px",
          }}
        >
          <Button
            style={{ margin: "auto", width: "40%" }}
            type="primary"
            onClick={handleSubmit}
            disabled={fileList.length === 0}
            className={fileList.length !== 0 ? "upload-button" : ""}
          >
            <UploadOutlined></UploadOutlined> Upload
          </Button>
        </div>
      </div>
    </>
  );
};

export default BellUploding;
