import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Pagination,
  Progress,
  Radio,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExcelFile,
  GetQcFilesUserAction,
  setQcFileUploadFalse,
  uploadQCDocumentsPutActionRejected,
  uploadQCFilesAction,
  userQCPaginationAction,
} from "../../../store/Actions/BaseAction";

import {
  InboxOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { URLS } from "../../../globals/urls";
import Dragger from "antd/es/upload/Dragger";
import {
  downloadCSVFronBackend,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import "./DigitizeDocument.scss";
import { useOutletContext } from "react-router-dom";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import JustButtonToRight from "../../CommonComponents/JustButtonToRight.jsx";

const QCFileUser = () => {
  const dispatch = useDispatch();
  const { onShowSizeChange } = useOutletContext();

  const columns = [
    {
      title: "Barcode Number",
      dataIndex: "barcode_number",
      width: 200,
    },
    {
      title: "District",
      dataIndex: "district",
    },
    {
      title: "Taluka",
      dataIndex: "taluka",
    },
    {
      title: "Village",
      dataIndex: "village",
    },
    {
      title: "Map Code",
      dataIndex: "map_code",
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
    {
      title: (
        <>
          Polygon <small> Digitization</small>
        </>
      ),
      dataIndex: "polygon_by_digitize",
      width: 150,
    },
    { title: "QC Polygon", dataIndex: "polygon_count" },
    {
      title: "Download Digitize",
      dataIndex: "download",
      width: 150,
    },
    {
      title: "Download Rectify",
      dataIndex: "downloadRectify",
      width: 150,
    },
    {
      title: "Digitize Remark",
      dataIndex: "digitize_remarks",
      width: 150,
    },
    {
      title: "QC Remark",
      dataIndex: "qc_remark",
      width: 230,
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);
  const [remarkObject, setremarkObject] = useState({});
  const [useUrl, setuseUrl] = useState(URLS.GET_QC_DETAILS_URL);
  const [fileList, setfileList] = useState([]);

  const [polygonCount, setPolygonCount] = useState({});
  const selector = useSelector((state) => state.qcFilesUser);

  useEffect(() => {
    if (!selector)
      dispatch(GetQcFilesUserAction({ URL: URLS.GET_QC_DETAILS_URL }));
  }, []);

  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (selector) {
      let newTalbleArray = [];
      setPolygonCount({});
      let res = selector.results;
      for (let index = 0; index < res.length; index++) {
        if ([res[index]["qc_remarks"]]) {
          remarkObject[[res[index]["id"]]] = res[index]["qc_remarks"];
        }

        if ([res[index]["polygon_count"]]) {
          polygonCount[[res[index]["id"]]] = res[index]["polygon_count"];
        }

        newTalbleArray.push({
          ...res[index],
          key: res[index]["id"],
          district:
            res[index]?.district_name &&
            res[index].district_name?.district_name,
          taluka:
            res[index]?.taluka_name && res[index].taluka_name?.taluka_name,
          village:
            res[index]?.village_name && res[index].village_name?.village_name,
          polygon_by_digitize: (
            <Tag color="blue" key={index}>
              {res[index]["polygon_count"]}
            </Tag>
          ),

          polygon_count: (
            <InputNumber
              min={0}
              max={9999}
              onChange={(value) => {
                if (value) {
                  setPolygonCount((p) => {
                    return {
                      ...p,
                      [res[index]["id"]]: value,
                    };
                  });
                }
              }}
            />
          ),
          download: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DIGITISE_DOCUMENT_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`${
                    res[index]?.current_status === "Qc Inprocess"
                      ? "already-downloaded-button"
                      : res[index]?.current_status === "PDF Rejected"
                      ? "rejected-button"
                      : "download-button"
                  }`}
                  onClick={(e) => {
                    const updatedTableDetailsArray = [...newTalbleArray];
                    const varName = document.querySelector(
                      `.dwn-btn-${res[index]["id"]}`
                    );

                    varName && varName.click();
                    updatedTableDetailsArray[index]["current_status"] =
                      "Qc Inprocess";

                    e.currentTarget.disabled = true;
                  }}
                >
                  <span>
                    Download <DownloadOutlined></DownloadOutlined>
                  </span>
                </Button>
              }
            </a>
          ),

          downloadRectify: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_RECTIFY_DOCUMENT_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`dwn-btn-${res[index]["id"]} download-button`}
                  onClick={(e) => {
                    e.currentTarget.disabled = true;
                  }}
                >
                  <span>
                    Download <DownloadOutlined></DownloadOutlined>
                  </span>
                </Button>
              }
            </a>
          ),
          qc_remark: (
            <Input
              placeholder="QC Remark"
              defaultValue={[res[index]["qc_remarks"]]}
              onChange={(event) => {
                const newValue = event.target.value;
                if (newValue === "") {
                  setremarkObject((s) => {
                    return { ...s, [res[index]["id"]]: "" };
                  });
                } else {
                  setremarkObject((s) => {
                    return { ...s, [res[index]["id"]]: newValue };
                  });
                }
              }}
            />
          ),
        });
      }

      settableData(newTalbleArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  useEffect(() => {
    let agencies = [];

    if (agencySelector) {
      for (let index = 0; index < agencySelector.length; index++) {
        agencies.push({
          value: agencySelector[index]["id"],
          label: agencySelector[index]["agency_name"],
        });
      }
    }
  }, [agencySelector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [selectedTableRows, setselectedTableRows] = useState([]);

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedTableRows(selections);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  const hasSelected = selectedRowKeys.length > 0;

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function getPageDetails(url) {
    setSelectedRowKeys([]);
    dispatch(userQCPaginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(userQCPaginationAction({ URL: url }));
  }

  const [setedStatus, setSetedStatus] = useState(null);
  const [file, setFile] = useState(null);

  function selectedStatus(e) {
    setSetedStatus(e.target.value);
  }

  const props = {
    name: "file",
    multiple: true,
    accept: ".dwg",
  };

  const rectifySelector = useSelector((state) => state.qcFileUploadSuccess);

  useEffect(() => {
    if (rectifySelector) {
      message.success(`${file.length} files uploaded.`);
      setFile([]);
      setSelectedRowKeys([]);
      setcurrentPage(1);
      setPolygonCount({});
      dispatch(setQcFileUploadFalse());
      dispatch(GetQcFilesUserAction({ URL: useUrl }));
    }
  }, [rectifySelector]);

  function dispatchDwg(dwgFormData) {
    let url = URLS.UPLOAD_QC_FILES_URL + setedStatus + "/";

    dispatch(
      uploadQCFilesAction({
        URL: url,
        data: { formData: dwgFormData },
      })
    );
  }

  function handleSubmit() {
    if (selectedRowKeys.length !== 0) {
      if (setedStatus) {
        if (setedStatus === "approved") {
          // alert(selectedRowKeys.length)
          if (selectedRowKeys && selectedRowKeys.length === 1) {
            if (file && file.length !== 0) {
              if (
                selectedTableRows &&
                file &&
                selectedTableRows.length * 2 === file.length
              ) {
                let canDispatch = true;
                let selectedfilesDwg = [];



                for (let index = 0; index < selectedTableRows.length; index++) {
                selectedfilesDwg.push(selectedTableRows[index]["barcode_number"]);
              }

              for (let index = 0; index < file.length; index++) {
                if (
                  !selectedfilesDwg.includes(
                    file[index]["name"].trim().split(".")[0]
                  )
                ) {
                  canDispatch = false;
                  break;
                }
              }

                // for (let index = 0; index < file.length; index++) {
                //   selectedfilesDwg.push(
                //     file[index]["name"].trim().split(".")[0]
                //   );
                // }

                // for (let index = 0; index < selectedfilesDwg.length; index++) {
                //   if (
                //     !selectedfilesDwg.includes(
                //       selectedTableRows[index]["file_name"].trim().split(".")[0]

                //     )
                //   ) {
                //     canDispatch = false;
                //     break;
                //   }
                // }

                if (canDispatch) {
                  let can_proceed = true;

                  for (let index = 0; index < selectedRowKeys.length; index++) {
                    if (
                      typeof polygonCount[selectedRowKeys[index]] !==
                        "number" &&
                      polygonCount[selectedRowKeys[index]] !== 0
                    ) {
                      can_proceed = false;
                      break;
                    }
                  }

                  if (can_proceed) {
                    let formData = new FormData();

                    // let dwgs = file.filter(
                    //   (element) =>
                    //     element.name.split(".")[1].toLowerCase() === "zip"
                    // );

                    let dwgs = file.filter((element) => {
                      const ext = element.name.split(".").pop().toLowerCase();
                      return ext === "zip" || ext === "pdf";
                    });

                    for (
                      let index = 0;
                      index < selectedRowKeys.length;
                      index++
                    ) {
                      formData.append(
                        "tippen_qc_remarks",
                        remarkObject[selectedRowKeys[index]]
                      );

                      formData.append(
                        "polygon_count",
                        polygonCount[selectedRowKeys[index]]
                      );
                    }

                    for (const el of dwgs) {
                      formData.append("files", el);
                      dispatchDwg(formData);
                    }
                  } else {
                    message.info(
                      "Update the number of polygons for the files you've chosen in the table."
                    );
                  }
                } else {
                  message.info(
                    "The selected files from the table do not match the uploaded file names!"
                  );
                }
              } else {
                message.info(
                  "The number of selected files from the table does not align with the count of uploaded files!"
                );
              }
            } else {
              message.info("Please Upload files!");
            }
          } else {
            message.info("You can upload only 1 file at once!");
          }
        } else {
          if (selectedRowKeys && selectedRowKeys.length !== 0) {
            let url = URLS.UPLOAD_QC_FILES_URL + setedStatus + "/";

            let updatedRemarkList = [];
            for (let index = 0; index < selectedRowKeys.length; index++) {
              updatedRemarkList.push({
                id: selectedRowKeys[index],
                qc_remarks: remarkObject[selectedRowKeys[index]]
                  ? remarkObject[selectedRowKeys[index]]
                  : "",
              });
            }

            dispatch(
              uploadQCDocumentsPutActionRejected({
                URL: url,
                remarksList: updatedRemarkList,
              })
            );

            setSelectedRowKeys([]);
          } else {
            message.info(
              "Select a file from the table and decide whether to reject it or place it on hold."
            );
          }
        }
      } else {
        message.info(
          "Please specify whether the selected file should be marked as Approved, Rejected, or placed On Hold!"
        );
      }
    } else {
      message.info("Please select some files from table!");
    }
  }

  const [totalFilesUploaded, settotalFilesUploaded] = useState(0);

  const uploadingProgress = ({ file, fileList }) => {
    const container = document.querySelector(".ant-upload-list");

    if (container) {
      container.style.width = "100%";
    }

    const totalFiles = fileList.length;
    setfileList(fileList);

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

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    let baseUrl = URLS.GET_QC_DETAILS_URL;
    let url = getSearchingUrl(values, keys);
    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (canSearch) onFinish(canSearch);
  }, [canSearch]);

  const onReset = () => {
    form.resetFields();
  };

  if (totalFilesUploaded && totalFilesUploaded === 100 && lodingFromState) {
    settotalFilesUploaded(0);
    setfileList([]);
  }

  function DownlaodZipOfSelectedFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  function downloadExlsFiles() {
    dispatch(downloadExcelFile({ URL: useUrl + "&is_export=1" }));
  }

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);

  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
  };

  useEffect(() => {
    if (downloadExcelSelector) {
      if (downloadExcelSelector) {
        downloadCSVFronBackend(downloadExcelSelector.csv_path);
        handleDownloadCompletion();
      }
    }
  }, [downloadExcelSelector]);

  return (
    <div>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                layout="inline"
                form={form}
                name="searchForm"
                initialValues={{
                  remember: true,
                }}
                onFinish={(v) => {
                  if (JSON.stringify(v) !== JSON.stringify(canSearch))
                    setCanSearch(v);
                }}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >
                <Form.Item name="barcode_number">
                  <Input placeholder="Barcode Number" />
                </Form.Item>

                <Form.Item name="district_name">
                  <Input placeholder="District Names" />
                </Form.Item>

                <Form.Item name="district_code">
                  <Input placeholder="District Code" />
                </Form.Item>

                <Form.Item name="taluka_name">
                  <Input placeholder="Taluka Name" />
                </Form.Item>

                <Form.Item name="taluka_code">
                  <Input placeholder="Taluka Code" />
                </Form.Item>

                <Form.Item name="village_name">
                  <Input placeholder="Village Name" />
                </Form.Item>

                <Form.Item name="village_code">
                  <Input placeholder="Village Code" />
                </Form.Item>

                <Form.Item name="map_code">
                  <Input placeholder="Map Code" />
                </Form.Item>

                <Form.Item name="current_status">
                  <Input placeholder="Current Status" />
                </Form.Item>

                <Space>
                  <Form.Item>
                    <Button
                      className="search-button"
                      type="dashed"
                      htmlType="submit"
                    >
                      Search
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="clear-button"
                      type="primary"
                      onClick={() => {
                        onReset();
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            ),
          },
        ]}
      />
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <div>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        <div className="flex justify-end">
          <Button
            className="download-button ml-2"
            type="dashed"
            onClick={downloadExlsFiles}
          >
            <DownloadOutlined></DownloadOutlined> Excel
          </Button>
        </div>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ ...setTableHeight(), x: 1800 }}
        />
        <div className="mt-2 mb-5">
          <Pagination
            responsive
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={totalCount}
            current={currentPage}
            showQuickJumpers
            pageSize={currentPageSize}
            defaultPageSize={currentPageSize}
            showTotal={(total) => `Total ${totalCount}`}
            onChange={paginationPageChange}
            style={{
              display: "flex",
            }}
          />
        </div>
        <Space className="flex justify-center">
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_RECTIFY_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> Rectify Zip
              </span>
            </Button>
          </a>
          &nbsp;
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_DIGITIZE_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              }`}
            >
              <span>
                <DownloadOutlined></DownloadOutlined> DWG Zip
              </span>
            </Button>
          </a>
        </Space>
        <div className="allocation-button-container">
          <div className="allocation-button-container">
            <Space direction="vertical">
              <Radio.Group buttonStyle="solid" onChange={selectedStatus}>
                <Radio.Button value="approved">Approved</Radio.Button>
                <Radio.Button value="rejected">Rejected</Radio.Button>
                <Radio.Button value="onhold">Hold</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
        </div>
      </div>

      <div className="upload-container">
        {/* <Dragger
          {...props}
          fileList={fileList}
          accept={[".zip,.pdf"]}
          listType="text"
          onChange={uploadingProgress}
          disabled={setedStatus !== "approved"}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag folder to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Only Zip QCs are allowed.
          </p>
        </Dragger> */}

  <Dragger
  {...props}
  fileList={fileList}
  accept=".zip,.pdf"
  listType="text"
  onChange={(info) => {
    const fileList = info.fileList;

    // Allow only .pdf and .zip files
    const validFiles = fileList.filter((file) =>
      file.name.endsWith(".pdf") || file.name.endsWith(".zip")
    );

    if (validFiles.length !== fileList.length) {
      message.error("Only .pdf and .zip files are allowed!");
    }

    // Validation to check if both types exist
    const hasPDF = validFiles.some((file) => file.name.endsWith(".pdf"));
    const hasZIP = validFiles.some((file) => file.name.endsWith(".zip"));

    if (validFiles.length > 0 && (!hasPDF || !hasZIP)) {
      message.warning("Please upload both a PDF and a ZIP file.");
    }

    uploadingProgress({ file: info.file, fileList: validFiles });
  }}
  disabled={setedStatus !== "approved"}
>

  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p className="ant-upload-text">
    Click or drag files to this area to upload
  </p>
  <p className="ant-upload-hint">
    Supports single or bulk upload. Both PDF and ZIP files are required.
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
            <Progress percent={totalFilesUploaded} strokeColor={twoColors} />
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {setedStatus === "approved" ? (
            <Button
              className={`${
                selectedRowKeys.length !== 0 ? "download-button" : ""
              }`}
              type="primary"
              disabled={selectedRowKeys.length === 0}
              onClick={handleSubmit}
            >
              <Space style={{ display: "flex" }}>Upload</Space>
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={selectedRowKeys.length === 0}
              className={`${
                selectedRowKeys.length !== 0 ? "download-button" : ""
              }`}
            >
              <Space style={{ display: "flex" }}>Submit</Space>
            </Button>
          )}
          {fileList.length > 0 ? (
            <Button
              className="clear-button"
              type="primary"
              onClick={() => {
                setfileList([]);
              }}
            >
              Clear uploaded files
            </Button>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
};

export default QCFileUser;
