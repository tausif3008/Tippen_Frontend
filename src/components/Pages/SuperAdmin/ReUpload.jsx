import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Progress, Space, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import "./reupload.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setUploadingFlase,
  reUploadScannedFilesPostAction,
} from "../../../store/Actions/BaseAction";
import "../../../images/removeFile.png";

const ReScanUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileList, setfileList] = useState([]);
  const [wrongUploadedFiles, setwrongUploadedFiles] = useState([]);

  const clearUploadedFils = useSelector((state) => state.uploading);

  useEffect(() => {
    const antUplaoder = document.querySelector(".ant-upload-list");
    if (antUplaoder) {
      const insertme = document.createElement("div");
      insertme.style.width = "100%";
      insertme.classList.add("upload-list-header-upload-error");

      const uploadHeader = document.createElement("div");
      uploadHeader.textContent = "Uploaded Files";
      uploadHeader.classList.add("uploaded-files-title");

      const errorHeader = document.createElement("div");
      errorHeader.textContent = "Error Files";
      errorHeader.classList.add("error-files-title");

      insertme.append(uploadHeader, errorHeader);
      antUplaoder.parentNode.insertBefore(insertme, antUplaoder);
    }

    const antUploadList = document.querySelector(".ant-upload-list");
    antUploadList.style.width = "100%";

    const uploadedFilesTitle = document.querySelector(".uploaded-files-title");

    if (uploadedFilesTitle) {
      if (fileList.length === 0) {
        uploadedFilesTitle.style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    const uploadedFilesTitle = document.querySelector(".uploaded-files-title");
    const errorTitle = document.querySelector(".error-files-title");

    if (wrongUploadedFiles.length === 0) {
      if (errorTitle) {
        errorTitle.style.display = "none";
        uploadedFilesTitle.style.display = "none";
      }
    } else {
      if (errorTitle && uploadedFilesTitle) {
        errorTitle.style.display = "block";
        uploadedFilesTitle.style.display = "block";
      }
    }

    const antUploadList = document.querySelector(".ant-upload-list");
    const errorFilesList = document.querySelector(".error-uploaded-files");

    if (antUploadList && errorFilesList) {
      if (wrongUploadedFiles.length !== 0) {
        antUploadList.style.width = "50%";
        errorFilesList.style.width = "47%";
        errorFilesList.style.marginLeft = "2%";
      } else {
        antUploadList.style.width = "100%";
        errorFilesList.style.width = "0%";
        errorFilesList.style.marginLeft = "0%";
      }
    }
  }, [wrongUploadedFiles]);

  useEffect(() => {
    if (clearUploadedFils === "completed") {
      setFile(null);
      setfileList(null);
      dispatch(setUploadingFlase());
      setUploaded(false);
    }
  }, [clearUploadedFils]);

  function removeErrorFile(file) {
    const index = fileList.indexOf(file);

    let newFileList = [...fileList];
    if (index === 0) {
      newFileList.shift();
    } else {
      newFileList.splice(index, 1);
    }

    if (file.status !== "uploading") {
      let formDataList = [];

      for (let i = 0; i < newFileList.length; i++) {
        formDataList.push(fileList[i].originFileObj);
      }

      setFile(formDataList);
    }
    setfileList(newFileList);
  }

  useEffect(() => {
    if (fileList) {
      let wrongFiles = [];
      const errorTitle = document.querySelector(".uploaded-files-title");

      if (errorTitle) {
        if (fileList.length !== 0) {
          errorTitle.style.display = "none";
        }
      }

      for (let index = 0; index < fileList.length; index++) {
        let barcodeNumber = fileList[index]["name"].split(".");

        if (barcodeNumber[0].length === 21 || barcodeNumber.length === 19) {
          continue;
        } else {
          wrongFiles.push(fileList[index]);
        }
      }
      setwrongUploadedFiles(wrongFiles);

      if (wrongFiles) {
        const container = document.querySelector(".error-uploaded-files");

        if (container) {
          container.innerHTML = "";

          wrongFiles.forEach((element, index) => {
            const div = document.createElement("div");
            div.className = "error-file-list-element";

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("upload_remove_button_container");

            nameDiv.textContent = element.name;

            const removeButton = document.createElement("button");
            removeButton.classList.add("upload_remove_button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () =>
              removeErrorFile(element)
            );

            div.appendChild(nameDiv);
            nameDiv.appendChild(removeButton);
            container.appendChild(div);
          });
        }
      }
    }
  }, [fileList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      if (wrongUploadedFiles.length === 0) {
        const formData = new FormData();
        file.forEach((element) => {
          formData.append("files", element);
        });
        dispatch(reUploadScannedFilesPostAction(formData));
      } else {
        message.info("Remove error files!");
      }
    }
  };

  const props = {
    name: "file",
    multiple: true,
  };

  const [totalFilesUploaded, settotalFilesUploaded] = useState(0);
  const uploadingProgress = ({ file, fileList }) => {
    if (uploaded === true) {
      setUploaded(false);
    }

    const totalFiles = fileList.length;
    setfileList(fileList);

    if (fileList.length === 0) {
      setUploaded(false);
    }

    const completedFiles = fileList.filter(
      (file) => file.status !== "uploading"
    ).length;

    if (file.status !== "uploading") {
      let formDataList = [];

      for (let i = 0; i < fileList.length; i++) {
        formDataList.push(fileList[i].originFileObj);
      }

      setFile(formDataList);
    }

    if (totalFiles > 0) {
      const progress = (completedFiles / totalFiles) * 100;
      settotalFilesUploaded(Math.floor(progress));
    }
  };

  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const lodingFromState = useSelector((state) => state.loading);

  if (totalFilesUploaded && totalFilesUploaded === 100 && lodingFromState) {
    setfileList(null);
  }

  const [uploaded, setUploaded] = useState(false);
  const [wrongFilesExists, setwrongFilesExists] = useState(false);

  useEffect(() => {
    if (wrongUploadedFiles.length === 0 && !wrongFilesExists) {
      setwrongFilesExists(true);
    } else if (wrongUploadedFiles.length === 0) {
      setwrongFilesExists(false);
    }
  }, [wrongUploadedFiles]);

  if (totalFilesUploaded && totalFilesUploaded === 100) {
    if (totalFilesUploaded === 100) {
      setUploaded(true);
    } else {
      setUploaded(false);
    }

    settotalFilesUploaded(0);
    const uploadListContainer = document.querySelector(".ant-upload-wrapper");
    const existingErrorFilesList = document.querySelector(
      ".error-uploaded-files"
    );

    if (existingErrorFilesList) {
      existingErrorFilesList.remove();
    }

    const errorFilesList = document.createElement("div");
    errorFilesList.classList.add("error-uploaded-files");
    errorFilesList.innerHTML = "error files list";

    const newDiv = document.createElement("div");
    newDiv.classList.add("error_file_header");
    newDiv.textContent = "Error Files";

    uploadListContainer.append(newDiv);

    uploadListContainer.append(errorFilesList);
  }

  return (
    <>
      <Divider orientation="left"> Re Upload Scanned Files</Divider>
      <div className="upload-container">
        <div className="uploader-container">
          <Space direction="vertical" style={{ display: "flex" }}>
            <Dragger
              {...props}
              percent
              progress
              onChange={uploadingProgress}
              accept={("image/png", "image/jpeg")}
              // directory
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
                Support for a single or bulk upload. Only JPEG and JPG images
                are allowed.
              </p>
            </Dragger>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalFilesUploaded !== 0 ? (
                <Progress
                  percent={totalFilesUploaded}
                  strokeColor={twoColors}
                />
              ) : (
                ""
              )}
            </div>

            <Button
              className={uploaded ? "upload-button" : ""}
              type="primary"
              onClick={handleSubmit}
              disabled={!uploaded}
            >
              <Space style={{ display: "flex" }}>
                <UploadOutlined></UploadOutlined> Upload
              </Space>
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default ReScanUpload;
